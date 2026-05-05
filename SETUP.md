# JK Consulting Website — Setup

## 1. Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha:

```bash
cp .env.local.example .env.local
```

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon pública do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de service role (apenas server-side) |
| `RESEND_API_KEY` | API key do Resend para envio de e-mail |
| `CONTACT_EMAIL` | E-mail que recebe os formulários |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp sem `+` (ex: `5511999999999`) |
| `NEXT_PUBLIC_CALENDLY_URL` | URL do embed do Calendly (opcional) |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (opcional) |

## 2. Banco de dados (Supabase)

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Acesse **SQL Editor** e execute o arquivo `supabase/schema.sql`
3. Crie os Storage Buckets:
   - `client-documents` — privado
   - `invoices` — privado
   - `partner-resources` — privado

## 3. Criar usuário admin

No **Supabase Dashboard → Authentication → Users**, crie um usuário e defina:

```json
user_metadata: { "name": "João", "role": "admin" }
```

Ou execute no SQL Editor:
```sql
-- Após criar o user no painel, atualize o metadata:
update auth.users
set raw_user_meta_data = '{"name": "João", "role": "admin"}'
where email = 'seu-email@gmail.com';
```

## 4. E-mail transacional (Resend)

1. Crie conta em [resend.com](https://resend.com)
2. Gere uma API key
3. Adicione e verifique seu domínio
4. Atualize `from` no arquivo `src/app/api/contact/route.ts`

## 5. Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## 6. Deploy (Vercel)

```bash
npm i -g vercel
vercel
```

Configure as variáveis de ambiente no painel da Vercel.

## 7. Conteúdo a preencher

- **Headline/Subheadline**: em `src/lib/i18n/locales/pt.json` → `home.hero`
- **Foto do fundador**: substitua o ícone `<User>` em `/sobre` por uma imagem real
- **WhatsApp**: configure `NEXT_PUBLIC_WHATSAPP_NUMBER`
- **Calendly**: configure `NEXT_PUBLIC_CALENDLY_URL`
- **Domínio e-mail**: atualize o `from:` na rota de contato para seu domínio verificado no Resend
