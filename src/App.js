import './App.css';

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  address: yup.string().required(),
  curriculum: yup.mixed().required().test("fileSize", "O arquivo deve ter no máximo 500kb", (value) => {
    return value && value[0].size <= 500000
  }),

});

export default function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nome</label>
      <input type="text" name="candidate_name" {...register("name")} />
      <p>{errors.name?.message}</p>

      <label>Email</label>  
      <input type="email" name="email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <label>Telefone</label>  
      <input type="number" name="phone" {...register("phone")} />
      <p>{errors.phone?.message}</p>

      <label>Endereço</label>  
      <input type="text" name="address" {...register("address")} />
      <p>{errors.address?.message}</p>

      <label>Currículo</label>  
      <input ref={register} required type="file" name="curriculum" {...register("curriculum")} />
      <p>{errors.curriculum?.message}</p>
      
      <input type="submit" />
    </form>
  );
}
