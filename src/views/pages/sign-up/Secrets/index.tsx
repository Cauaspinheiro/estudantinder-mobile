import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'

import { FormHandles } from '@unform/core'
import { ValidationError } from 'yup'

import { useSignUpContext } from 'main/context/sign-up'
import ValidateSignUpSecret, {
  IValidateSignUpSecretData,
} from 'main/validators/sign-up/Secret'

import FormButton from 'views/components/atoms/FormButton'
import GoBackButton from 'views/components/atoms/GoBackButton'
import Input from 'views/components/atoms/Input'
import PasswordInput from 'views/components/atoms/PasswordInput'
import SignUpContainer from 'views/components/templates/SignUpContainer'
import { FormMain, FormTitle, SignUpForm } from 'views/styles/globalStyles'

import setValidationErrors from 'shared/setValidationErrors'

const Secrets: React.FC = () => {
  const router = useNavigation()

  const { setSecrets, secrets } = useSignUpContext()

  const formRef = useRef<FormHandles>(null)

  function handleNavigateToPerson() {
    router.navigate('sign-up/Person')
  }

  function onFormButtonPress() {
    formRef.current?.submitForm()
  }

  async function handleSubmit(data: IValidateSignUpSecretData) {
    try {
      // Remove all previous errors
      formRef?.current?.setErrors({})

      const schema = ValidateSignUpSecret(data)

      await schema.validate(data, {
        abortEarly: false,
      })

      setSecrets({ email: data.email, password: data.password })

      handleNavigateToPerson()
    } catch (err) {
      if (err instanceof ValidationError) {
        return setValidationErrors(err, formRef)
      }

      return alert(err)
    }
  }

  return (
    <SignUpContainer>
      <GoBackButton />

      <FormMain>
        <FormTitle>Cadastre-se</FormTitle>

        <SignUpForm ref={formRef} onSubmit={handleSubmit} initialData={secrets}>
          <Input
            name="email"
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('password').focus()
            }
          />

          <PasswordInput
            name="password"
            label="Senha"
            onSubmitEditing={() =>
              formRef.current?.getFieldRef('confirm_password').focus()
            }
          />

          <PasswordInput
            name="confirm_password"
            label="Confirmar senha"
            returnKeyType="done"
            onSubmitEditing={onFormButtonPress}
            blurOnSubmit
          />
        </SignUpForm>

        <FormButton title="CONTINUAR" onPress={onFormButtonPress} />
      </FormMain>
    </SignUpContainer>
  )
}

export default Secrets