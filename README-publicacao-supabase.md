# Publicacao Seam Rio com Supabase e GitHub Pages

## 1. Criar o projeto Supabase

1. Acesse https://supabase.com e crie um projeto.
2. Abra o projeto e va em **SQL Editor**.
3. Crie uma nova query.
4. Cole todo o conteudo de `supabase-schema.sql`.
5. Clique em **Run**.

## 2. Configurar a aplicacao

1. No Supabase, va em **Project Settings > API**.
2. Copie o **Project URL**.
3. Copie a chave **anon/public**.
4. Abra `supabase-config.js`.
5. Preencha:

```js
window.SEAM_RIO_SUPABASE = {
  url: "https://SEU-PROJETO.supabase.co",
  anonKey: "SUA-CHAVE-ANON"
};
```

## 3. Preparar arquivos para GitHub Pages

Suba estes arquivos para o repositorio:

- `gestao-producao-biquinis.html`
- `seam-rio-logo.png`
- `supabase-config.js`

Renomeie `gestao-producao-biquinis.html` para `index.html` no repositorio.

## 4. Ativar GitHub Pages

1. No GitHub, entre no repositorio.
2. Va em **Settings > Pages**.
3. Em **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, escolha `main` e `/root`.
5. Clique em **Save**.

## 5. Primeiro acesso

1. Abra o site publicado.
2. Cadastre o primeiro usuario.
3. Esse primeiro usuario sera o administrador.
4. Depois disso, novos usuarios so podem ser cadastrados pelo administrador, dentro do painel **Usuarios**.

## Observacao de seguranca

Esta versao deixa os dados online e acessiveis de qualquer lugar, mas ainda usa um login proprio da aplicacao.
Para seguranca mais forte em ambiente publico, a evolucao ideal e migrar para Supabase Auth com politicas RLS e uma Edge Function para criacao de usuarios por administrador.
