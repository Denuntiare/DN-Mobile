# DN-Mobile

Denuntiare App.

## Requisitos

- Node.js 20
- npm
- Expo CLI local instalado por `npm install`
- DN-Server rodando em `http://localhost:3333`

## Configuracao

```bash
npm install
```

Em desenvolvimento com Expo, o app tenta descobrir o IP do host automaticamente e usa a porta `3333`.

Se precisar informar a URL manualmente, edite `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://SEU_IP_LOCAL:3333"
    }
  }
}
```

## Execucao

```bash
npm start
```

Depois, abra pelo Expo Go ou emulador.

Os scripts usam `NODE_OPTIONS=--openssl-legacy-provider` porque o Metro usado pelo Expo SDK 37 precisa dessa compatibilidade no Node.js 20.
O `postinstall` tambem aplica um patch no `metro-cache` antigo para evitar o uso de `md4`, que nao e aceito pelo OpenSSL do Node.js 20.
