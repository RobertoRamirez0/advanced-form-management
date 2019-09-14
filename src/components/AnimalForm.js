import React from 'react';
import { withFormik, Form, Field} from 'formik';

const AnimalForm = (props) => {
  
  return (
    <div className="animal-form">
      <Form>
        <Field type="text" name="species" placeholder="Species" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

export default withFormik({
  mapPropsToValues: (values) => {
    return {
      species: values.species || 'def' 
    }
  },
  handleSubmit: (values) => {
    console.log(values)
  }
})(AnimalForm)
