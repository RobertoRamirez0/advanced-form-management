import React from 'react';
import { withFormik, Form, Field} from 'formik';
import * as yup from 'yup';

const AnimalForm = ({ errors, touched }) => {
  
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
  validationSchema: yup.object().shape({
    species: yup.string().required('Species is required!'),
    age: yup.number().required('Age is required!').positive(),
    diet: yup.string().required('Diet is required!'),
    vaccinations: yup.boolean().oneOf([true], 'Animal must be vaccinated!')
  }),
  handleSubmit: (values) => {
    console.log(values)
  }
})(AnimalForm)
