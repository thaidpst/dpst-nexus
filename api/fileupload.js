const express = require('express');
const router = express.Router();
const async = require('async');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


// Profile storage
const storageProfile = multer.diskStorage({
    destination: './public/profile/',
    filename: (req, file, cb)=>{
      cb(null, 'profile' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadProfile = multer({
    storage: storageProfile,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb)=>{
        checkProfileImage(file, cb);
    }
});
function checkProfileImage(file, cb) {
    let filetypes = /jpeg|jpg|png/;
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    let mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    else cb('Profile upload error: only .jpeg, .jpg, and .png are allowed for uploading.');
    return cb(null, true);
}

// Forms storage
const storageForms = multer.diskStorage({
    destination: './public/forms/',
    filename: (req, file, cb)=>{
      cb(null, 'form' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadForms = multer({
    storage: storageForms,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb)=>{
        checkForms(file, cb);
    }
});
function checkForms(file, cb) {
    let filetypes = /pdf/;
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    let mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    else cb('Form upload error: only .pdf is allowed for uploading.');
    return cb(null, true);
}

// Form preview storage
const storageFormPreview = multer.diskStorage({
    destination: './public/formPreview/',
    filename: (req, file, cb)=>{
      cb(null, 'fp' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadFormPreview = multer({
    storage: storageFormPreview,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb)=>{
        checkFormPreview(file, cb);
    }
});
function checkFormPreview(file, cb) {
    let filetypes = /jpeg|jpg|png/;
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    let mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    else cb('Form preview upload error: only .jpeg, .jpg, and .png are allowed for uploading.');
    return cb(null, true);
}


router.post('/deleteuserprofile', (req, res)=>{
    let userId = req.db.id(req.body.input.userId);
    let dbUserDetail = req.db.get('userDetail');

    dbUserDetail.findOne({ userId: userId })
        .then(check1=>{
            if (check1===null) res.json({status:false, message:'Delete user profile image fail: Cannot find the account.', data:0});
            else {
                if (check1.profileUrl===undefined || check1.profileUrl===null || check1.profileUrl=='') {
                    res.json({status:true, message:'Delete user profile image successfully.', data:1});
                } else {
                    let profile = 'public/profile/' + check1.profileUrl;
                    fs.unlinkSync(profile);
                    delete check1.profileUrl;
                    dbUserDetail.update({ userId: userId }, check1, { multi: false })
                        .then(()=>{res.json({status:true, message:'Delete user profile image successfully.', data:1})});
                }
            }
        })
        .catch(err1=>{res.json({status:false, message:'Delete user profile image error: '+err1, data:null})}); 
});
router.post('/uploaduserprofile', (req, res, next)=>{
    let userId = req.db.id(req.query.userId);
    let dbUserDetail = req.db.get('userDetail');

    let upload = uploadProfile.array(userId, 1);
    upload(req, res, err=>{
        if (err) res.json({status:false, message:'Upload user profile image error: '+err, data:null});
        else {
            dbUserDetail.findOne({ userId: userId })
                .then(check1=>{
                    check1.profileUrl = req.files[0].filename;
                    dbUserDetail.update({ userId: userId }, check1, { multi: false })
                        .then(()=>{res.json({status:true, message:'Upload user profile image successfully.', data:1})});
                })
                .catch(err1=>{res.json({status:false, message:'Upload user profile image error: '+err1, data:null})});
        }
    });
});

router.post('/uploadgovform', (req, res, next)=>{
    let upload = uploadForms.array('pdfForm', 1);
    upload(req, res, err=>{
        if (err) res.json({status:false, message:'Upload gov form error: '+err, data:null});
        else {
            res.json({status:true, message:'Upload gov form successfully!', data:req.files[0].filename});
        }
    });
});
router.post('/uploadgovformpreview', (req, res, next)=>{
    let upload = uploadFormPreview.array('previewUrl', 1);
    upload(req, res, err=>{
        if (err) res.json({status:false, message:'Upload gov form preview error: '+err, data:null});
        else {
            res.json({status:true, message:'Upload gov form preview successfully!', data:req.files[0].filename});
        }
    });
});


module.exports = router;