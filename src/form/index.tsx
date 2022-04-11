import { FormItemFeedbackType } from './ItemControl';
import InternalForm, { FormInstance, List, useForm, FormProvider } from './Form';
import { Props as FormProps, FormLayout } from './interface';
import Item from './Item';
import WithSubComponent from '../utils/withSubComponent';

const Form = WithSubComponent(InternalForm, {
  FormProvider,
  Item,
  List,
  useForm,
});

export { FormInstance, FormLayout, FormItemFeedbackType, FormProps, List, useForm, FormProvider };

export default Form;
