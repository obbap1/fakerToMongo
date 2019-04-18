const mongoose = require('mongoose');
const faker = require('faker');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    employee_id: {ref: 'Job_History', type: String },
    last_name: String,
    first_name: String,
    middle_initial: String,
    sex: String,
    address: String,
    city: String,
    address: String,
    city: String,
    region: String,
    postal_code: String,
    home_phone: String,
    office_phone: String,
    office_location: String,
    manager_id:String,
    vacation_hours: Number,
    sick_leave_hours: Number,
});

const JobHistorySchema = new Schema({
    employee_id: String,
    date: String,
    title_id: {ref: 'Titles', type: String},
    department_id: {ref: 'Departments', type: String},
    pay: String,
});

const TitlesSchema = new Schema({
    title_id: String,
    title: String,
    level: String,
    job_description: String,
    low_pay: String,
    high_pay: String,
});

const DepartmentsSchema = new Schema({
   department_id: String,
   name: String,
   manager_id: {ref: 'Employee', type: String},
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const Job_History = mongoose.model('Job_History', JobHistorySchema);
const Titles = mongoose.model('Titles', TitlesSchema);
const Departments = mongoose.model('Departments', DepartmentsSchema);

const dbUrl = 'mongodb://paschal:paschal1@ds161391.mlab.com:61391/interview_db';

const db = mongoose.connection;

mongoose.connect(dbUrl);

function saveNewEmployee() {
    
const newEmployee = new Employee({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    middle_initial: faker.name.findName(),
    sex: 'Male',
    address: faker.address.county(),
    city: faker.address.city(),
    region: faker.address.longitude(),
    postal_code: faker.address.zipCode(),
    home_phone: faker.phone.phoneNumber(),
    office_phone: faker.phone.phoneNumber(),
    office_location: faker.address.county(),
    manager_id:faker.lorem.word(),
    vacation_hours: 6,
    sick_leave_hours: 9,

});

newEmployee.save((err,data)=> {
    if(!err) console.log('user saved');
})

}

function saveJobHistory() {

    const newJobHistory = new Job_History({
        employee_id: faker.lorem.word(),
        date: faker.date.recent(),
        title_id: faker.lorem.word(),
        department_id: faker.lorem.word(),
        pay: faker.lorem.word(),
    });

    newJobHistory.save((err,data) => {
        if(!err) console.log('Job History saved');
    })

}

function saveDepartments() {

    const newDepartment = new Departments({
        department_id: faker.lorem.word(),
        name: faker.name.findName(),
        manager_id: faker.lorem.word(),
    })

    newDepartment.save((err,data) => {
        if(!err) console.log('department saved');
    })
}

function saveTitles(){

    const newTitle = new Titles({
        title_id:faker.lorem.word(),
        title: faker.lorem.word(),
        level: faker.lorem.word(),
        job_description:faker.lorem.word(),
        low_pay: faker.lorem.word(),
        high_pay: faker.lorem.word(),
    })

    newTitle.save((err,data) => {
        if(!err) console.log('title saved');
    })

}

//saveJobHistory();
// saveDepartments();
//saveTitles();
module.exports = {
    Employee,
    Titles,
    Departments,
    Job_History
}