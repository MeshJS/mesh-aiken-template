# Quick Start

## Yaci DevKit Setup (Local Devnet)

### Install Yaci DevKit

```
npm install -g @bloxbean/yaci-devkit
```

### Start local devnet

```
yaci-devkit up --enable-yaci-store --interactive
```

> **(Optional)** Open Yaci Viewer in another terminal:
>
>```
>yaci-viewer
>```
>
> A handy mini explorer to watch your local devnet activity

## Run the template

```bash
npm install
npm run aiken  # Build smart contracts
npm run dev    # Test all contracts
```

That's it! The template will automatically use your local/hosted Yaci devnet to test smart contracts.

## Resources

- [Mesh SDK](https://meshjs.dev/)
- [Yaci Devkit](https://devkit.yaci.xyz/)
- [Aiken](https://aiken-lang.org)
