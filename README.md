# YieldLens — Frontend

**A lightweight portfolio tracker for Stellar DeFi — no spreadsheets, no manual math.**

## The Problem

Stellar's DeFi ecosystem is growing fast (Soroswap, Phoenix, Aquarius), but tracking yield performance across protocols is fragmented. Impermanent loss calculations are manual, historical APY data is scattered, and there's no single dashboard to see how your liquidity positions are actually performing. YieldLens gives you a clean, "set-and-forget" view of your entire Stellar yield portfolio.

## What This Project Does

- Tracks LP positions across **Soroswap**, **Phoenix Hub**, and **Aquarius**
- Monitors **Stellar native pool** balances
- Calculates **impermanent loss** and **realized vs. unrealized P&L**
- Surfaces historical APY trends so you can compare pools at a glance

## MVP Protocols

| Protocol | Type |
|----------|------|
| Stellar Native Pools | Classic AMM |
| Soroswap | Soroban AMM |
| Phoenix Hub | Soroban DEX |
| Aquarius | Yield / Bribes |

## Target Audience

Retail DeFi yield farmers who want a clean, set-and-forget dashboard. No complex tooling — just connect your wallet and see your positions.

## Related Projects

| Project | Description |
|---------|-------------|
| [YieldLens-backend](../YieldLens-backend) | REST API & indexer |
| [YieldLens-contract](../YieldLens-contract) | Soroban smart contracts |

## Stack

- **Frontend:** React + TypeScript
- **Blockchain:** Stellar / Soroban

## Status

Early development. MVP scope is focused on the four protocols above with a responsive web interface.

## License

MIT
