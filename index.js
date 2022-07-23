const Joi = require('joi'); //class
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

app.get('/',(req,res)=> {
    res.send('Hello World!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

//post Request
app.post('/api/courses',(req,res)=>{
    const { error } = validateCourse(req.body); //result.error
    if (error) return res.status(400).send(result.error.details[0].message);
        //400 Bad Request
   const course ={
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT request
app.put('/api/courses/:id',(req,res)=>{
    //look for the course
    //if not exist return 404
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')//404

    //validate
    //if invalid, return 400- bad request
    
    const { error } = validateCourse(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);
         //400 Bad Request

    //update course
    course.name= req.body.name;
    //return the updates course
    res.send(course);
});

app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course
    // Not existing, return 404
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')//404

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //Return the same course
    res.send(course);

});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


// /api/courses/1
app.get('/api/courses/:id', (req,res) =>{
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found')//404
    res.send(course);
})



// PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`listening on port ${port}...`));



// app.post()
// app.put()
// app.delete()
