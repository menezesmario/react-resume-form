import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf", "application/doc", "application/docx", "application/txt"];

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().email().required("O campo E-mail é obrigatório"),
  phone: yup.string().required("O campo Telefone é obrigatório"),
  address: yup.string().required("O campo Endereço é obrigatório"),
  curriculum: yup.mixed("teste").required("O envio do currículo é obrigatório")
  .test("fileSize", "O arquivo deve ter no máximo 500kb", (value) => {
    return value && value[0].size <= 500000
  })
  .test("fileType", "Arquivos suportados: .pdf, .doc, .docx ou txt", value => SUPPORTED_FORMATS.includes(value.type))
  ,

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
          <p>{errors.name?.message}</p>

          <label>Email</label>  
          <input type="email" name="email" {...register("email")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <p>{errors.email?.message}</p>

          <label>Telefone</label>  
          <input type="number" name="phone" {...register("phone")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <p>{errors.phone?.message}</p>

          <label>Endereço</label>  
          <input type="text" name="address" {...register("address")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <p>{errors.address?.message}</p>

          <label>Currículo</label>  
          <input ref={register} type="file" name="curriculum" {...register("curriculum")} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
          <p>{errors.curriculum?.message}</p>
          
          <input type="submit" />
          
        </form>
      </div>
    </section>
  
   
  );
}
