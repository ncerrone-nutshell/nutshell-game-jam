# Getting up and running - sean p

1. Create and navigate to a new directory:

    ```bash
    cd ~ && mkdir games && cd games
    ```

2. Clone the repository:

    ```bash
    git clone https://github.com/ncerrone-nutshell/nutshell-game-jam.git
    cd nutshell-game-jam
    ```

3. Install Node.js v23.7.0 (Latestversion):

    ```bash
    nvm install 23.7.0
    nvm use 23.7.0
    ```

    > To switch back to a different Node version later: `nvm use <version>`

4. Install dependencies:

    ```bash
    npm install
    ```

5. Start development server:
    ```bash
    npm run dev
    ```
    > The development server features hot reloading - any changes you make to the code will automatically update in the browser without needing to refresh.

# Contributors <!--Add yourself here!-->

-   Drew White
-   Nick Cerrone
