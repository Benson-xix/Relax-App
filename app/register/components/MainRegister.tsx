import ContainerMain from "@/app/component/ContainerMain"
import FormWrap from "@/app/component/FormWrap"
import RegisterForm from "./RegisterForm"
import { getCurrentUser } from "@/action/getCurrentUser"


const MainRegister = async () => {
  const currentUser = await getCurrentUser()
  return (
    <ContainerMain>
      <FormWrap>
        <RegisterForm  currentUser={currentUser}/>
      </FormWrap>
    </ContainerMain>
  )
}

export default MainRegister