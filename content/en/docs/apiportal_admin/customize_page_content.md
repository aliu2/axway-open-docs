---
title: Additional customizations
linkTitle: Additional customizations
weight: 7
date: 2019-07-30
---

This section describes how you can customize other features of your API Portal.

Add reCaptcha to sign up
------------------------
You can customize your sign up functionality by enabling reCaptcha, or you can configure API Portal with SMTP to enable sending user registration emails.

reCaptcha is a free service you can add to the API Portal sign up page to prevent spam and abuse. The reCaptcha plugin is available in Joomla!.

{{< alert title="" color="primary" >}}You must have a Google user name and password to add reCaptcha. For more details, see [reCaptcha documentation](https://www.google.com/recaptcha/intro/index.html).{{< /alert >}}

1.  Go to the [reCaptcha admin page](https://www.google.com/recaptcha/admin#list).
2.  Give a label for your site (such as `API Portal`) label, enter the API Portal domain (here `localhost.localdomain`) in the **Domains** field, and select **Register**.
3.  ![reCaptcha screen with register a new site with lable and domains displayed](/Images/APIPortal/reCatchalocalhostlocaldomain.png)

4.  Select the domain, and review how to add the reCaptcha:
    
    ![reCaptcha screen that display how to add reCAPTCHA to the API Portal](/Images/APIPortal/recaptchasitekeysteps.png)
5.  Log in to the Joomla! Administrator Interface (JAI) (`https://<API Portal_host>/administrator`).
6.  Select **Extensions > Plugins**.
7.  Click **Captcha - ReCaptcha**.
8.  Enter the respective reCaptcha keys to the **Site key** and **Secret key** fields.
9.  Set the **Status** of the plugin to `Enabled`, and click **Save & Close**.
10. Click **System > Global Configuration > Users**.
11. On the **User Options** tab, set the Captcha field to **Captcha - ReCaptcha**, and click **Save & Close**.

To verify the change, go to API Portal home page, and click **Sign In > Sign up**. The reCaptcha functionality is displayed on the sign up page.

1.  ![API Portal sign up page, captcha is displayed](/Images/APIPortal/reCaptcahsigunp.png)

Configure API Portal with SMTP
------------------------------

To send emails from API Portal (for example, for user registration or email validation), you must configure an SMTP server in API Manager. For more details, see [Configure API Manager settings in Policy Studio](/csh?context=1002&product=prod-api-manager-77) in the [API Manager User Guide](/bundle/APIManager_77_APIMgmtGuide_allOS_en_HTML5/) .

Customize user registration emails
----------------------------------

You can customize the emails that are sent to API Portal users on sign up. All API Portal user emails are sent from API Manager, so to customize them follow the instructions in [Customize API Manager generated email](/csh?context=1029&product=prod-api-manager-77) in the [API Manager User Guide](/bundle/APIManager_77_APIMgmtGuide_allOS_en_HTML5/) .

# Customize API Portal user login

You can customize what API Portal page your API consumers see on first log in, and you can also enable ReCaptcha and user account locking on the login page.

Change the page displayed after first login
-------------------------------------------

You can change the API Portal page users see when they first log in successfully to API Portal. The default behavior is:

-   Display the Applications page if at least one application exists
-   Display the API Catalog page if no applications exist

To change this, follow these steps:

1.  In the Joomla! Administrator Interface (JAI), click **Components > API Portal > Additional Settings**.
2.  In the **Redirect after login** field, enter a menu link (for example, `/index.php?option=com_apiportal&view=home`) or a menu alias (for example, `/home`) to redirect the user to after successful login.
3.  Click **Save**.

Enable ReCaptcha and user account locking
-----------------------------------------

You can customize API Portal user login to display a ReCaptcha and lock the user account after a number of failed login attempts:

1.  In the JAI, click **Components > API Portal > Login Protection**.
2.  Click **Yes** to enable login protection for API Portal.
3.  Enter a value for the number of failed login attempts before a ReCaptcha is displayed.
4.  Enter a value for the number of failed login attempts before the user account is locked.
5.  Enter a value in seconds for how long the user account is locked.
6.  Click **Yes** to enable locking by IP address. When this setting is enabled login attempts are blocked from the same IP address for the lock time specified even if correct user credentials are entered.
7.  You can enable user account locking and IP address locking independently or in combination. For example, if you enable user account locking and IP address locking for 5 minutes after 2 failed login attempts, `UserA` will be locked for 5 minutes after entering 2 incorrect passwords, and any other user (for example, `UserB`) will also be unable to log in for 5 minutes from the same IP address, even if they provide correct user credentials.
8.  Click **Save**.

### Reset locked user accounts

Click **Clear Locked Accounts** to reset all locked user accounts, so that the users can log in again.

Add a customized message to the login page
------------------------------------------

You can add a customized message to the API Portal login page. You can use this message, for example, to inform your users that logging in to your API Portal constitutes consent to abide by your company's security policies and standards. This message is displayed in the format of a banner.

To enable this feature follow these steps:

1.  In the JAI, click **Extensions > Modules**.
2.  Click **New** to create a new module.
3.  From the list of module types click **Custom**.
4.  Enter a title for the message.
5.  Use the text editor to enter the text for the message.
6.  Select **Purity_iii** > **login-message-consent** from the **Position** list.
7.  Click **Save &** **Close**.
8.  Go to the API Portal Sign In page, refresh the page, and verify that the banner is shown.

Enforce password policies
-------------------------

To ensure compliance with security polices, you can enforce password policies by asking your API Portal users to change their password at first login, as well as after an expired interval. These settings are available in API Manager, and they are enabled by default.

To disable the **Enable password expiry** and **Days before passwords expire** settings, follow these steps in API Manager:

1.  Click **Settings > API Manager settings.**
2.  Disable **Enable password expiry** and **Days before passwords expire** fields.

{{< alert title="Note" color="primary" >}} If you disable **Enable password expiry**, which forces users to change password at first login, and a new user logs in after that, then this user will not be asked to change password if you decide to enable this setting again.{{< /alert >}}

# Customize applications

You can customize what your API consumers can see in the Applications view of API Portal, and you can customize what rights they have on applications and credentials.

You can customize the following:

-   Show or hide the button that enables users to create new applications. The default is shown.
-   Show or hide the button that enables users to delete applications. The default is shown.
-   Show or hide the list of APIs for applications. The default is shown.
-   Enable users read/write or read only permissions on credentials, or hide credentials completely. The default is read/write.
-   Show or hide application scopes. The default is shown.

Customize application settings
------------------------------

To change the settings:

1.  In to the Joomla! Administrator Interface (JAI), click **Menus > Main Menu**.
2.  Click **Applications**.
3.  Click the **Applications** tab.
4.  ![](/Images/APIPortal/jai_customize_apps.png)

5.  Change the settings as required and click **Save & Close**.

Customize application sharing settings
--------------------------------------

You can hide the list of users when sharing an application in API Portal. When this setting is enabled, an application developer cannot see the full list of users from the same organization when sharing an application. This ensures that the privacy of your other users is protected, and their contact details (for example, email address) are not revealed.

To change the settings:

1.  Log in to the Joomla! Administrator Interface (JAI) (`https://<API Portal_host>/administrator`).
2.  Click **Components > Main Menu**.
3.  Click **API Portal > Additional Settings**.
4.  In the **Enable user listing** field, click **No** to hide the user listing, or click **Yes** to show it. The default is to hide the user listing.

When the **Enable user listing** setting is set to **Yes**, an application developer can see the details (user name and email) of all other users that an application is shared with, and to share the application with another user they can select the user from a list of all users in the organization.

When the setting is set to **No**, an application developer cannot see the details of all other users the application is shared with, but can see those users with whom they shared the application. To share the application with another user they must enter an email address. An error is displayed if the email does not belong to the organization.

When the setting is set to **Yes** or **No** an organization administrator can see all the users that an application is shared with, regardless of who shared it with them.

# Customize API Portal standard footer

You can customize API Portal standard footer `Copyright © 2018 Axway` to display the name of your company, and you can also add more information to it.

Override the name of the company
--------------------------------

You can display the name of your company in the API Portal standard footer.

1.  In the Joomla! Administrator Interface (JAI), click **Extensions > Languages > Overrides**.
2.  Search for the `COM_APIPORTAL_FOOTER_COMPANY` constant and click to edit it.
3.  In the **Text** field, replace `Axway` with the name of your company.
4.  Click **Save**.

Add rich text to the standard footer
------------------------------------

You can customize your company's footer by adding more text to it.

1.  In the JAI, click **Extensions > Modules**.
2.  Click **New** to create a new module.
3.  From the list of module types click **Custom**.
4.  On the right sidebar, select 'Footer[footer]' from the **Position list**, and select 'Hide' on the **Show title** option.
5.  Use the text editor to enter the text.
6.  Click **Save**.

# Customize monitoring

To enable your API consumers to view monitoring information for their APIs and application in API Portal, you must ensure that you have enabled monitoring in the connected API Manager. For details, see [Monitor APIs and applications in API Manager](/csh?context=1030&product=prod-api-manager-77) in the [API Manager User Guide](/bundle/APIManager_77_APIMgmtGuide_allOS_en_HTML5/) .

If monitoring is disabled in the connected API Manager, all monitoring information, including the following UI elements, are hidden in API Portal:

-   The **Monitoring** menu option.
-   The **View Metrics** links in the API Catalog and Applications pages.
-   The **Usage** tabs in the API and View Application pages.

In the case of multiple API Managers connected to API Portal:

-   The **Monitoring** menu option is visible if at least one of the connected API Managers has monitoring enabled.
-   The **Monitoring** menu option is hidden if all of the connected API Managers have monitoring disabled.
-   The **View Metrics** links in the API Catalog and Applications pages are hidden for items where the corresponding API Manager has monitoring disabled, and visible otherwise.
-   The **Usage** tabs in the View Application and API pages are hidden for items where the corresponding API Manager has monitoring disabled, and visible otherwise.

{{< alert title="Note" color="primary" >}}In the API Portal home page the **Manage and analyze** banner is visible regardless of whether monitoring is enabled or disabled in the connected API Manager. If monitoring is disabled, the Monitoring page will be empty. {{< /alert >}}

# Add a customized privacy policy

The privacy policy feature enables you to define and manage privacy policies that users must accept when signing up to your API Portal.

When you install API Portal, a default privacy policy article is automatically created as a placeholder in Joomla!. You can use this default policy to verify how it will appear to your API consumers.

API Portal also creates a privacy policy system group and a privacy policy category to enable the privacy policy feature.

{{< alert title="Caution" color="warning" >}}You must not edit or delete the default privacy policy article, group, or category. {{< /alert >}}

Create a new privacy policy
---------------------------

You must create your customized privacy policy before enabling it in API Portal. Follow these steps in the Joomla! Administrator Interface (JAI):

1.  Click **Content > Articles > New**
2.  Enter a meaningful name for your policy, and the text of the privacy policy.
3.  Select `Privacy Policy` from the **Category** list.
4.  Click **Save and Close.**

{{< alert title="Caution" color="warning" >}}To meet GDPR compliance regulations, JAI does not allow you to edit a privacy policy. To update a policy you must create a new article on the privacy policy category.{{< /alert >}}

Enable your new privacy policy
------------------------------

Enable a policy article:

1.  Click **Components > API Portal > Additional settings** and select the desired policy from the list in the **Privacy Policy** field.
2.  Click **Save**.

This will display a dialog asking to new users to read and agree with the policy on sign up.

Privacy policy agreement for existing users
-------------------------------------------

After you enable the privacy policy feature, API Portal will display a dialog asking existing users to read and agree with the policy on their next login. If they decline it they will be redirected to the login page to try again. If they accept it, they will not be asked to accept it again on subsequent logins.

If you create and enable a new policy, for example, because the policy of your company has changed, the users will be asked to read and agree with the new policy on next login.

# API Manager custom properties support

API Portal offers an interface to the custom properties defined in API Manager. For more details on how to add and manage custom properties in API Manager, see [Customize API Manager data](/bundle/APIManager_77_APIMgmtGuide_allOS_en_HTML5/page/Content/APIManagementGuideTopics/api_mgmt_custom.htm#customize_api_manager_data).

API Portal supports custom properties for the following entities:

1.  Application: You can view and edit the values of the custom properties defined for applications.
2.  User: You can view and edit the values of the custom properties defined for users.
3.  API: You can only view the values of the custom properties defined for APIs.

API Portal does not support custom properties defined for organizations.
