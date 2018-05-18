const express = require('express');
const router = express.Router();
const async = require('async');


router.get('/getformcategory', (req, res)=>{
    let dbGovFormCategory = req.db.get('govFormCategory');
    
    dbGovFormCategory.find()
        .then(check1=>{
            res.json({status:true, message:'Get form category successfully!', data:check1});
        })
        .catch(err1=>{res.json({status:false, message:'Get form category error: '+err1, data:null})});
});

router.get('/getactiveforms/:category/:start/:limit/:sort/:search', (req, res)=>{
    let category = req.params.category,
        start = Number(req.params.start),
        limit = Number(req.params.limit),
        sort = req.params.sort,
        search = req.params.search;
    let dbGovForms = req.db.get('govForms');

    let sortObj = {_id:-1};
    if (sort=='Name increasing') sortObj = {nameTH: 1, nameEN: 1};
    else if (sort=='Name decreasing') sortObj = {nameTH: -1, nameEN: -1};
    else if (sort=='Owner increasing') sortObj = {onwer: 1};
    else if (sort=='Owner decreasing') sortObj = {onwer: -1};
    else if (sort=='Created date increasing') sortObj = {_id: 1};
    else if (sort=='Created date decreasing') sortObj = {_id: -1};

    let query = {
        $and: [
            {status: 'Active'}
        ]
    };
    if (search!='EmptyNone') {
        query = {
            $and: [
                {status: 'Active'},
                {$or: [
                    {nameTH: {$regex: search, $options: 'i'}},
                    {nameEN: {$regex: search, $options: 'i'}},
                    {govOwner: {$regex: search, $options: 'i'}}
                ]}
            ]
        }
    }
    if (category!='None') query['$and'].push({category: category});

    dbGovForms.find(query, {
            limit: limit, skip: start, sort: sortObj
        })
        .then(check1=>{
            dbGovForms.count(query)
                .then(totalForms=>{
                    res.json({
                        status: true, 
                        message: 'Get forms successfully!', 
                        data: check1,
                        totalForms: totalForms 
                    });
                })
                .catch(err2=>{res.json({status:false, message:'Get forms error: '+err2, data:null})});
        })
        .catch(err1=>{res.json({status:false, message:'Get forms error: '+err1, data:null})});
});
router.get('/getformdetail/:accessCode', (req, res)=>{
    let accessCode = req.params.accessCode;
    let dbGovForms = req.db.get('govForms');
    
    dbGovForms.findOne({ accessCode: accessCode })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Get form detail fail: Cannot find the form.', data:0});
            else res.json({status:true, message:'Get form detail successfully!', data:check1})
        })
        .catch(err1=>{res.json({status:false, message:'Get form detail error: '+err1, data:null})});
});

router.get('/getsubmittedforms/:userId/:start/:limit/:sort', (req, res)=>{
    let userId = req.db.id(req.params.userId),
        start = Number(req.params.start),
        limit = Number(req.params.limit),
        sort = req.params.sort;
    let dbSubmittedGovForms = req.db.get('submittedGovForms'),
        dbGovForms = req.db.get('govForms');

    let sortObj = {_id: -1};
    if (sort=='Status increasing') sortObj = {status: 1};
    else if (sort=='Status decreasing') sortObj = {status: -1};
    else if (sort=='Submitted date increasing') sortObj = {_id: 1};
    else if (sort=='Submitted date decreasing') sortObj = {_id: -1};

    let query = {userId: userId};
    
    dbSubmittedGovForms.find(query, {
        limit: limit, skip: start, sort: sortObj
    })
    .then(check1=>{

        let result = [];
        async.each(
            check1,
            (d, callback)=>{
                let formId = req.db.id(d.formId);
                dbGovForms.findOne({_id: formId}, {_id:-1, accessCode: 1, nameTH: 1, nameEN: 1})
                    .then(check2=>{
                        if (check2!==null) {
                            d.form = check2;
                            result.push(d);
                        }
                        callback();
                    });
            },
            err2=>{
                dbSubmittedGovForms.count(query)
                    .then(check3=>{
                        res.json({
                            status: true, message: 'Get submitted forms successfully!', 
                            data: result, totalSubmittedForms: check3
                        });
                    });
            }
        );
    })
    .catch(err1=>{res.json({status:false, message:'Get submitted forms error: '+err1, data:null})});
});

router.post('/submit', (req, res)=>{
    let userId = req.db.id(req.body.input.userId),
        formId = req.db.id(req.body.input.formId),
        formValue = req.body.input.formValue;
    let dbSubmittedGovForms = req.db.get('submittedGovForms');

    dbSubmittedGovForms.insert({
        userId: userId,
        formId: formId,
        formValue: formValue,
        status: 'Pending'
    })
    .then(check1=>{
        res.json({status:true, message:'Submit gov form successfully!', data:formId});
    })
    .catch(err1=>{res.json({status:false, message:'Submit gov form error: '+err1, data:null})}); 
});
router.post('/editform', (req, res)=>{
    let formId = req.db.id(req.body.input.formId),
        formValue = req.body.input.formValue;
    let dbSubmittedGovForms = req.db.get('submittedGovForms');

    dbSubmittedGovForms.findOne({_id: formId})
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Edit gov form fail: Cannot find the form.', data:0});
            else {
                if (check1.status!='Pending') res.json({status:true, message:'Edit gov form fail: The form has already been approved.', data:1});
                else {
                    check1.formValue = formValue;
                    dbSubmittedGovForms.update({_id: formId}, check1, { multi: false })
                        .then(check2=>{
                            res.json({status:true, message:'Edit gov form successfully!', data:1});
                        });
                }
            }
        })
        .catch(err1=>{res.json({status:false, message:'Edit gov form error: '+err1, data:null})}); 
});
router.post('/deletesubmittedform', (req, res)=>{
    let userId = req.db.id(req.body.input.userId),
        formId = req.db.id(req.body.input.formId);
    let dbSubmittedGovForms = req.db.get('submittedGovForms');

    dbSubmittedGovForms.remove({_id: formId, userId: userId}, { justOne: true })
        .then(status1=>{
            res.json({status:true, message:'The submitted form has been deleted successfully!', data:formId});
        });      
});

router.get('/pendingformnumber', (req, res)=>{
    let dbSubmittedGovForms = req.db.get('submittedGovForms');
    
    dbSubmittedGovForms.count({status: 'Pending'})
        .then(check1=>{
            res.json({status:true, message:'Get pending form number successfully!', data:check1});
        })
        .catch(err1=>{res.json({status:false, message:'Get pending form number error: '+err1, data:null})});
});

router.get('/admingetactiveforms/:category/:start/:limit/:sort/:search', (req, res)=>{
    let category = req.params.category,
        start = Number(req.params.start),
        limit = Number(req.params.limit),
        sort = req.params.sort,
        search = req.params.search;
    let dbGovForms = req.db.get('govForms'),
        dbSubmittedGovForms = req.db.get('submittedGovForms');

    let sortObj = {_id:-1};
    if (sort=='Name increasing') sortObj = {nameTH: 1, nameEN: 1};
    else if (sort=='Name decreasing') sortObj = {nameTH: -1, nameEN: -1};
    else if (sort=='Owner increasing') sortObj = {onwer: 1};
    else if (sort=='Owner decreasing') sortObj = {onwer: -1};
    else if (sort=='Created date increasing') sortObj = {_id: 1};
    else if (sort=='Created date decreasing') sortObj = {_id: -1};

    let query = {
        $and: [
            {status: 'Active'}
        ]
    };
    if (search!='EmptyNone') {
        query = {
            $and: [
                {status: 'Active'},
                {$or: [
                    {nameTH: {$regex: search, $options: 'i'}},
                    {nameEN: {$regex: search, $options: 'i'}},
                    {govOwner: {$regex: search, $options: 'i'}}
                ]}
            ]
        }
    }
    if (category!='None') query['$and'].push({category: category});

    dbGovForms.find(query, {
            limit: limit, skip: start, sort: sortObj
        })
        .then(check1=>{
            dbGovForms.count(query)
                .then(totalForms=>{
                    async.each(
                        check1,
                        (d, callback)=>{
                            dbSubmittedGovForms.count({formId: req.db.id(d._id), status: 'Pending'})
                                .then(check2=>{
                                    d.pendingNumber = check2;
                                    callback();
                                });
                        },
                        err2=>{
                            res.json({
                                status: true, 
                                message: 'Get admin forms successfully!', 
                                data: check1,
                                totalForms: totalForms 
                            });
                        });
                })
                .catch(err2=>{res.json({status:false, message:'Get admin forms error: '+err2, data:null})});
        })
        .catch(err1=>{res.json({status:false, message:'Get admin forms error: '+err1, data:null})});
});
router.get('/admingetsubmittedforms/:formId/:start/:limit/:sort', (req, res)=>{
    let formId = req.db.id(req.params.formId),
        start = Number(req.params.start),
        limit = Number(req.params.limit),
        sort = req.params.sort,
        search = req.params.search;
    let dbSubmittedGovForms = req.db.get('submittedGovForms'),
        dbUsers = req.db.get('users');

    let sortObj = {_id: -1};
    if (sort=='Status increasing') sortObj = {status: 1};
    else if (sort=='Status decreasing') sortObj = {status: -1};
    else if (sort=='Submitted date increasing') sortObj = {_id: 1};
    else if (sort=='Submitted date decreasing') sortObj = {_id: -1};

    let query = {formId: formId};
    
    dbSubmittedGovForms.find(query, {
        limit: limit, skip: start, sort: sortObj
    })
    .then(check1=>{
        dbSubmittedGovForms.count(query)
            .then(totalForms=>{
                async.each(
                    check1,
                    (d, callback)=>{
                        dbUsers.findOne({_id: req.db.id(d.userId)}, {firstname: 1, lastname: 1, email:1})
                            .then(check2=>{
                                d.firstname = check2.firstname;
                                d.lastname = check2.lastname;
                                d.email = check2.email;
                                callback();
                            });
                    },
                    err2=>{
                        res.json({
                            status: true, 
                            message: 'Get admin submitted forms successfully!', 
                            data: check1,
                            totalForms: totalForms 
                        });
                    });
            });
    })
    .catch(err1=>{res.json({status:false, message:'Get admin submitted forms error: '+err1, data:null})});
});

router.post('/setsubmittedformstatus', (req, res)=>{
    let formId = req.db.id(req.body.input.formId),
        status = req.body.input.status,
        approver = req.body.input.approver;
    let dbSubmittedGovForms = req.db.get('submittedGovForms');

    dbSubmittedGovForms.findOne({ _id: formId })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Set submitted form status fail: Cannot find the form.', data:0});
            else {
                check1.status = status;
                check1.approverId = req.db.id(approver._id);
                check1.approvedDate = new Date();
                dbSubmittedGovForms.update({ _id: formId }, check1, { multi: false })
                    .then(()=>{
                        res.json({ status:true, message:'The submitted form status is set successfully.', data:1});
                    });
            }
        })
        .catch(err1=>{res.json({status:false, message:'Set submitted form status error: '+err1, data:null})});        
});


module.exports = router;