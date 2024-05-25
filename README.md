## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

```project/
│
├── src/
│   │
│   ├── auth/
│   │   │
│   │   ├── dto/
│   │   │   └── AuthCredentialsDTO.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── AuthController.ts
│   │   │
│   │   ├── services/
│   │   │   └── AuthService.ts
│   │   │
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   │
│   ├── users/
│   │   │
│   │   ├── dto/
│   │   │   └── UserDTO.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── UserController.ts
│   │   │
│   │   ├── services/
│   │   │   └── UserService.ts
│   │   │
│   │   ├── entities/
│   │   │   └── User.entity.ts
│   │   │
│   │   └── repositories/
│   │       └── UserRepository.ts
│   │
│   ├── admin/
│   │   │
│   │   ├── dto/
│   │   │   └── AdminDTO.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── AdminController.ts
│   │   │
│   │   ├── services/
│   │   │   └── AdminService.ts
│   │   │
│   │   ├── entities/
│   │   │   └── Admin.entity.ts
│   │   │
│   │   └── repositories/
│   │       └── AdminRepository.ts
│   │
│   ├── movies/
│   │   │
│   │   ├── dto/
│   │   │   └── MovieDTO.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── MovieController.ts
│   │   │
│   │   ├── services/
│   │   │   └── MovieService.ts
│   │   │
│   │   ├── entities/
│   │   │   └── Movie.entity.ts
│   │   │
│   │   └── repositories/
│   │       └── MovieRepository.ts
│   │
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   │
│   ├── app.module.ts
│   └── main.ts
│
└── ...

```
