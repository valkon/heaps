import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../ChakraUiComponents/InputField';
import SubmitButton from '../ChakraUiComponents/Button';
import { Container, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/user';
import { useCreate_UserMutation } from '../../generated/graphql';
interface Values {
  username: string;
  email: string;
  address: string;
  zipCode: string;
  password: string;
}
export interface State {
  user?;
  items?;
}
export default function Register() {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const [, registerUser] = useCreate_UserMutation();
  console.log({ user });
  return (
    <Container>
      <Formik
        initialValues={{
          username: '',
          address: '',
          zipCode: '',
          email: '',
          password: '',
        }}
        onSubmit={async (values: Values) => {
          await registerUser({ options: values })
            .then((res) => dispatch(register(res.data.createUser.user)))
            .then((res) => console.log(res))
            .catch((err) => console.log(err.message));
        }}>
        {(props) => (
          <Form>
            <Heading>Register</Heading>
            <InputField name='username' />
            <InputField name='address' />
            <InputField name='zipCode' />
            <InputField name='email' />
            <InputField name='password' />
            <SubmitButton props={props} name='Register' />
          </Form>
        )}
      </Formik>
    </Container>
  );
}
