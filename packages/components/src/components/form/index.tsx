import React from 'react';

import { FormItemFeedbackType } from './ItemControl';
import Form, { Props as FormProps, FormLayout, FormInstance, List, useForm, FormProvider } from './Form';
import Item from './Item';

const InternalForm = React.forwardRef<FormInstance, FormProps>(Form);
type InternalForm = typeof InternalForm;

const RefForm = InternalForm as RefForm;

interface RefForm extends InternalForm {
  FormProvider: typeof FormProvider;
  Item: typeof Item;
  List: typeof List;
  useForm: typeof useForm;
}

RefForm.FormProvider = FormProvider;
RefForm.List = List;
RefForm.Item = Item;
RefForm.List = List;
RefForm.useForm = useForm;

export { FormInstance, FormLayout, FormItemFeedbackType, FormProps, List, useForm, FormProvider };

export default RefForm;
