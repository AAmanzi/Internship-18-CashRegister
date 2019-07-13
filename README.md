# Internship-18-CashRegister

Web application for a cash register.

# Technologies used

- NET Core 2.2.0
- EF Core 2.2.6
- SQL Server 2.2.0
- React 16.0.0

Libraries:

- --react-router-dom 4.2.2
- --axios 0.19.0
- --lodash 1.0.0
- --react-to-print 2.1.3

# Starting the app

Open _CashRegister.sln_

In the Package Manager Console set the Default project to _CashRegister.Data_

Run _Update-Package_

Run _Update-Database_

On CashRegister.Web/ClientApp

Run _npm update_

Start the app through VisualStudio

\* Make sure _CashRegister.Web_ is set as the default project

# Seeded data

For logging in:

        Username: bojana

        Password: e70

        \* Login also requires selecting a _CashRegister_

                Only one seeded as Tommy01 which is

                selected through the dropdown menu

                on the login screen

For filtering _Products_:

        Typing 123 in the products filter displays all currently seeded products

For filtering _Receipts_:

        Typing 7/12/2019 in the receipts filter displays all currently seeded receipts

# Navigation

- Whilst having the product search input focused you can begin navigating

through the displayed products using the arrow keys

- All confirmations are accepted by pressing &#39;Enter&#39;
- All confirmations are cancelled by pressing &#39;Escape&#39;/&#39;Esc&#39;
- Pressing &#39;Space&#39; while on the _Main screen_/screen for adding products to

the receipt the button for submitting/paying the receipt is focued
