# Contributing

Thanks for contributing to MINT.

## Local setup

```bash
pnpm install
pnpm dev
```

## Quality checks

Run before opening a pull request:

```bash
pnpm lint
pnpm test
pnpm build
```

If your change touches UI behavior, also run:

```bash
pnpm test:e2e
```

## Pull request checklist

- Keep changes focused and minimal.
- Add or update tests where behavior changes.
- Update docs (`README.md`) if user-facing behavior changed.
- Verify the app works on desktop and mobile viewports.

## Commit style

Use clear, imperative commit messages, e.g.:

`feat(web): add text preset dialog`
`fix(editor): keep selection after layer reorder`
