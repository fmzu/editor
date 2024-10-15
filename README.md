```
bun install
bun run --cwd api dev
bun run --cwd ui dev
```

Drizzle-studio

```
bun run --cwd api studio
```


デプロイ(どっちもdeployするときはapiの方から順番に)

```
bun run --cwd api deploy
bun run --cwd ui deploy
```

DBの作成
```
bun --cwd api wrangler d1 create hascii
```

Drizzleスキーマに基づいてマイグレーションを生成する

```
bun --cwd api drizzle-kit generate
```

ローカルのデータベースを更新

```
bun --cwd api wrangler d1 migrations apply hascii --local
```

本番環境のデータベースを更新

```
bun --cwd api wrangler d1 migrations apply hascii --remote
```
