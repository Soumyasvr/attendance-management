const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Register_number: {
        type: String,
        required: true,
    },
    Year_of_studying: {
        type: String,
    },
    Branch_of_studying: {
        type:String,
    },
    Date_of_Birth: {
        type:String
    },
    Gender: {
        type:String
    },
    Community: {
        type:String
    },
    Minority_Community: {
        type:String
    },
    Blood_Group: {
        type:String
    },
    Aadhar_number: {
        type:String
    },
    Mobile_number: {
        type:String
    },
    Email_id: {
        type:String
    }
    



});

const Student = mongoose.model("Student1", StudentSchema)
module.exports = Student;