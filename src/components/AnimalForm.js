import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const AnimalForm = ({ errors, touched, status }) => {
  //console.log(status) <-- gives the object with the data from the form 
  const [animals, setAnimals] = useState([])

  useEffect(()=> {
    if (status) { //if status is undefined it is not going to add to animals
      setAnimals([...animals, status])
    }
  }, [status])

  return (
    <div className="animal-form">
      <Form>
        {touched.species && errors.species && <p className="error">{errors.species}</p>}
        <Field type="text" name="species" placeholder="Species" />
        
        {touched.age && errors.age && <p className="error">{errors.age}</p>}
        <Field type="number" name="age" placeholder="Age" />
        
        {touched.diet && errors.diet && <p className="error">{errors.diet}</p>}
        <Field component="select" name="diet">
          <option value="" disabled>Select Diet:</option> {/*<-- this is our placeholder*/}
          <option value="carnivore">Carnivore</option>
          <option value="herbivore">Herbivore</option>
          <option value="omnivore">Omnivore</option>
        </Field>
        
        {touched.vaccinations && errors.vaccinations && <p className="error">{errors.vaccinations}</p>}
        <label>
          <Field type="checkbox" name="vaccinations" />
          <span>Vaccinations</span>
        </label>

        <Field component="textarea" name="notes" placeholder="Notes" />
        
        <button type="submit">Submit</button>

        {animals.map((animal) => (
          <div>
            <ul>
              <li>Species: {animal.species}<br />
              Age: {animal.age}<br />
              Diet: {animal.diet}<br />
              Vaccinations? {animal.vaccinations}
              </li>
            </ul>
          </div>
        ))}
      </Form>
    </div>
  )
}

export default withFormik({
  //values come from formik automatically === magic!
  mapPropsToValues: (values) => {
    //this makes these inputs 'controlled'
    return {
      //these keys line up with the 'names' attribute from our Fields
      species: values.species || '' ,
      age: values.age || '',
      diet: values.diet || '',
      vaccinations: values.vaccinations || false,
      notes: values.notes || '' 
    }
  },
  //validation tool comes from the yup library
  validationSchema: yup.object().shape({
    species: yup.string().required('Species is required!'),
    age: yup.number().required('Age is required!').positive(),
    diet: yup.string().required('Diet is required!'),
    vaccinations: yup.boolean().oneOf([true], 'Animal must be vaccinated!')
  }),
  handleSubmit: (values, { setStatus }) => {
    //'https://reqres.in/api/animals'
    
    //console.log(values)
    //sends data to the api under res.data 
    axios.post('https://reqres.in/api/animals', values)
      .then(res => {
        setStatus(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }
})(AnimalForm)
