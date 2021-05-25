import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// const SUPPORTED_FORMATS = [];

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().email().required("O campo E-mail é obrigatório"),
  phone: yup.string().required("O campo Telefone é obrigatório"),
  address: yup.string().required("O campo Endereço é obrigatório"),
  curriculum: yup.mixed("teste").required("O envio do currículo é obrigatório")
  .test("fileSize", "O arquivo deve ter no máximo 500kb", (value) => {
    return value && value[0].size <= 500000
  })
  .test("fileType", "Arquivos suportados: .pdf, .doc, .docx ou txt", (value) => ["application/pdf", "application/doc", "application/docx", "application/txt"]),

});

export default function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  

  return (
    <section className="App h-screen w-full flex justify-center items-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-800" >
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 py-8 pt-8">
          <label>Nome</label>
          <input type="text" name="candidate_name" {...register("name")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          <small>{errors.name?.message}</small>
          <br/>
          <label>Email</label>  
          <input type="email" name="email" {...register("email")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <small>{errors.email?.message}</small>
          <br/>
          <label>Telefone</label>  
          <input type="number" name="phone" {...register("phone")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <small>{errors.phone?.message}</small>
          <br/>
          <label>Endereço</label>  
          <input type="text" name="address" {...register("address")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <small>{errors.address?.message}</small>
          <br/>
          <label>Currículo</label>  
          <input ref={register} type="file" name="curriculum" {...register("curriculum")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <small>{errors.curriculum?.message}</small>
          <br/>
          <input type="submit" style={{backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "4px", width: "100%", cursor: "pointer"}}/>
          {/* <button type="submit" className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"> Enviar </button>          */}
        </form>
      </div>
    </section>
  
   
  );
}
