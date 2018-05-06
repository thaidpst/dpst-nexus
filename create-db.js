
// Create collection and schema validations
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "username", "password", "salt", "level", "firstname", "lastname", "email", "status" ],
            uniqueItems: [ "username" ],
            properties: {
                username: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                salt: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                level: {
                    enum: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
                    description: "can only be one of the enum values and is required"
                },
                firstname: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                lastname: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                status: {
                    enum: [ 'Ban', 'Pending', 'Active' ],
                    description: "can only be one of the enum values and is required"
                },
            }
        }
    },
    validationAction: "warn"
});

//  Initialize data
db.users.insert({
    username : "TofuMaster",
    password : "430ea75272ad84391a3d17ab9a2f0f4f6fbe90b4b7cea1e6e5f1e461bb9b252b7ec397ad6c378ddb22c77429c5ce7329bfc38492ba3a573fcd59c0a561476972",
    salt : "4f6d7987252a903e07b7763df07ab46b",
    level: 10,
    firstname: "Sarun",
    lastname: "Seepun",
    email: "sarun_sla@hotmail.com",
    status: "Active"
});
db.users.insert({
    username : "nui",
    password : "badc11358bb889bdd1ec674c606e66c87d3ca569475b09d99e0027a44976914ec25f526c7f7a2bfb3b56ff80936c0ea2d817956e2f65bbb22a9bda51fda004b0",
    salt : "6b0164bc5c1ad0020fd046bae81ea9ac",
    level: 9,
    firstname: "นพรัตน์",
    lastname: "ศรีเจริญ",
    email: "nsric@ipst.ac.th",
    status: "Active"
});