import Header from "../component/Header";
import Footer from "../component/footer/Footer";
import MainRegister from "./components/MainRegister";


const page = () => {
  return (
    <div className="flex min-h-screen  flex-col  bg-slate-400 gap-3   ">
    <Header />
    <div className="flex-grow bg-white text-slate-700">
        <MainRegister/>
      </div>
    <Footer/>
    </div>
  );
};

export default page;
