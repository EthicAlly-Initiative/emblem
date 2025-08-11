# EthicAlly Emblem

## Context

Having to fixate on one hemisphere in the EAI emblem was a pain-point, and I noted an opportunity to get creative with the handling of the world itself.

Based on the original EAI emblem (implemented in the Agent prototype), this version is intended to be either consumed directly into EAI applications, or used interactively via the [logo preview site](https://emblem.ethically.ngo/).

## Installation

`npm i -S EthicAlly-Initiative/emblem`

> Should run the `prepare` script, compiling this repo

## Usage

```jsx
import EAI from '@ethic/emblem';

<EAI
    className=""
    size="100px" | "10em" | "30rem" | "10ch"
    animatedStage="loading" | "final" | null
/>
```

-   `size` accepts any css ready value
