create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    nome_completo,
    cpf,
    email,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    is_subscribed,
    subscription_status
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome_completo', ''),
    coalesce(new.raw_user_meta_data ->> 'cpf', ''),
    coalesce(new.raw_user_meta_data ->> 'email', new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'cep', ''),
    coalesce(new.raw_user_meta_data ->> 'logradouro', ''),
    coalesce(new.raw_user_meta_data ->> 'numero', ''),
    coalesce(new.raw_user_meta_data ->> 'bairro', ''),
    coalesce(new.raw_user_meta_data ->> 'cidade', ''),
    coalesce(new.raw_user_meta_data ->> 'estado', ''),
    coalesce((new.raw_user_meta_data ->> 'is_subscribed')::boolean, false),
    coalesce(new.raw_user_meta_data ->> 'subscription_status', 'pending')
  );

  return new;
end;
$$;
