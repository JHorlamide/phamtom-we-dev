import Head from 'next/head';
import type { NextPage } from 'next';
import Image from 'next/image';
import { Banner, useScreenSize, Layout } from '../../components/LandingPage';

const Terms: NextPage = () => {
  const screenSize = useScreenSize();

  const solutions = [
    {
      title: 'Electronic Health Records',
      description:
        // eslint-disable-next-line quotes
        "PHAMTOM's electronic health records powers the documentation and access to patients' health records from any location for optimum healthcare delivery.",
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    },
    {
      title: 'Online Pharmacy Marketplace',
      description:
        // eslint-disable-next-line quotes
        'PHAMTOM online pharmacy marketplace helps patients to locate their preferred medications that might not be available in local drug stores around them, at competitive price and high quality from any location.',
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    },
    {
      title: 'Easy to Use for Patients',
      description:
        // eslint-disable-next-line quotes
        'Patients love PHAMTOM as a one-stop-app for their health needs.',
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    },
    {
      title: 'Easy Integration',
      description:
        // eslint-disable-next-line quotes
        "It helps pharmacies to easily integrate their offline operations with their online operation without the need to write a single line of code or hire a web developer to setup and manage an online store. Hence, they're able to save cost from hiring web developers, domain and hosting services, logistics, and many more.",
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    }
  ];

  return (
    <Layout>
      <div className='about_'>
        <Head>
          <title>PHAMTOM - About Us</title>
          <meta
            name='description'
            content="PHAMTOM app is a B2B2C e-commerce marketplace, telechat and electronic health records platform for Africa's Pharmacies and Hospitals."
          />
        </Head>

        <header>
          <div style={{ marginBottom: '75px' }}>
            <Banner
              height={screenSize.width >= 821 ? '280px' : '200px'}
              content='Terms And Conditions'
            />
          </div>
        </header>

        <main>
          <div className='about_main'>
          

            {/* challenges */}
            <section>
              {/* <div className='challanges_flex'> */}
                {/* <div></div> */}

                <div className='challenges'>
                  {/* <h5>Challenges</h5> */}
                  <div>
                 <h5>TERMS AND CONDITIONS STATEMENT</h5> 
                    <p> This is a legally binding agreement between PHAMTOM Health Technologies (RC: 1867522), 
                        a Nigeria based Limited Liability Company (“PHAMTOM”), on the one hand, and you and your medical Healthcare, 
                        business, or similar organization (collectively, the “Healthcare”), on the other hand.  
                        By clicking “I AGREE” or by otherwise signing-up for a PHAMTOM account, or by accessing or using 
                        the services (as defined below), The PHAMTOM is entering into this PHAMTOM subscription agreement 
                        (this “agreement”) and the HEALTHCARE agrees to be bound by its TERMS AND CONDITIONS. 
                        Please read this agreement carefully, and do not sign-up for an account or use the services 
                        if the healthcare is unwilling or unable to be bound by the TERMS AND CONDITIONS OF THIS Agreement.  
                        PHAMTOM and the Healthcare are collectively referred to as the “Parties.” 
                    </p>
                    <br />
                    
                    <h5>RECITALS</h5> 
                    <p>
                        Whereas, the Healthcare is a medical Healthcare licensed to Healthcare medicine; Whereas, 
                        PHAMTOM has developed and implemented mobile and web-based software application for 
                        Online Pharmacy marketplace, Telechat, and Electronic health records (EHR) , 
                        to be licensed by PHAMTOM pursuant to and in accordance with the terms and conditions of this 
                        Agreement as a service to the Healthcare (the “Services”); and whereas, the Healthcare desires 
                        to license use of the Services from PHAMTOM, and PHAMTOM desires to license use of the Services 
                        to the Healthcare, pursuant to the terms and conditions of this Agreement (TERMS & CONDITIONS). 
                        Therefore, for good and valuable consideration, the receipt and sufficiency of which is hereby 
                        acknowledged, the Parties, intending to be legally bound, hereby agree as follows:
                    </p>
                    <br />

                    <h5>TERMS & CONDITIONS</h5>
                    <p style={{margin: '10px 0'}}>
                        As an inducement to PHAMTOM to provide the Healthcare with a free trial of the Services (“Free Trial”), 
                        the Healthcare hereby agrees to the following terms and conditions: {' '}
                    </p>

                    <p style={{margin: '10px 0'}}>
                        1. Subject to PHAMTOM’s rights to modify or terminate the Trial Period (as defined below) hereunder, 
                        the trial period shall commence on the day the Healthcare initiates the Free Trial after registering on 
                        phamtomhealth.com/health/register (or any successor site established by PHAMTOM) or downloaded and 
                        registered on the mobile app, for a trial user account and ends one (1) month thereafter or as deem 
                        fit by PHAMTOM (such period is hereinafter referred to as the “Trial Period”). Such Trial Period may 
                        not be extended except extension is granted by PHAMTOM.  PHAMTOM may immediately suspend or terminate 
                        the Free Trial at any time (whether before, during, or after the Trial Period), without notice to the Healthcare,
                        and without any liability whatsoever.  PHAMTOM reserves the right to modify, change, or supplement these 
                        Trial Terms and Conditions at any time by posting new Trial Terms and Conditions on PHAMTOM’s applicable 
                        website and mobile apps.  Such new Trial Terms and Conditions are effective upon posting with 
                        five (5) days’ notice by PHAMTOM on PHAMTOM’s applicable website or mobile apps.  
                        Therefore, the Healthcare hereby agrees to be responsible for regularly and periodically accessing 
                        and reviewing PHAMTOM’s website and mobile apps. {' '}
                    </p>

                    <p style={{margin: '10px 0'}}>
                        2. Trial License Grant: PHAMTOM hereby grants the Healthcare, upon the terms and conditions contained 
                        in these Trial Terms and Conditions, a limited, non-transferable, non-sublicensable, non-exclusive 
                        license for all licensed professionals associated with the Healthcare, including, without limitation, 
                        all physicians, nurse practitioners, physician assistants, pharmacists, and therapists (collectively, 
                        “Licensed Users”) to use the Services, during the Trial Period in accordance with PHAMTOM’s then current 
                        documentation but only: (i) in the ordinary course of the Healthcare’s normal and ordinary internal 
                        business, and (ii) in accordance with applicable federal, state, and local laws, rules, and regulations 
                        (“Intended Purpose”). The Healthcare covenants and agrees that the Services shall not be used by any person 
                        or entity other than the licensed users for the intended purpose and shall prevent any subcontractor or agent 
                        of the Healthcare or any other third party from using the Services. The Healthcare acknowledges that the Services 
                        will encompass information about items, devices, products and/or services not owned by PHAMTOM, but instead provided 
                        by a third party or third parties, inclusive of, but not limited to, third-party vendors and manufacturers 
                        (“Third Party Services”). {' '}
                    </p>

                    <p style={{margin: '10px 0'}}>
                        3. Trial License Restrictions: In furtherance of Section 2 of the Trial Terms and Conditions, 
                        the Healthcare shall not, and shall not permit any third party (including, but not limited to, affiliates, 
                        employees, or agents of any third party) to: (i) duplicate, modify, decompile or reverse engineer any of the 
                        Services for any reason; or (ii) resell the Services to any unrelated third party. This is a license, not a sale. 
                        The Healthcare shall not allow anyone to: (a) circumvent any security feature of the Services; (b) use the Services 
                        to provide services (including processing, commercial timesharing, rental, sharing, application service provider, 
                        “service office,” or “service bureau” arrangements) to any third party; (c) permit any third party to view, use, access, 
                        or copy the Services; or (d) disclose, publish, broadcast, sell, or otherwise redistribute the Services. The Healthcare 
                        shall maintain the confidentiality and security of any password, account, and other identification information provided 
                        with respect to the Services and not to provide it to any other person or entity (including, but not limited to affiliates, 
                        employees, or agents of any third party). The Healthcare shall be responsible for all use of, and activities that occur under, 
                        its password(s), account, and other identification information and for any actions that take place through its access to the 
                        Services (whether conducted by the Healthcare or another). The Healthcare agrees to use the Services only for the Intended 
                        Purpose. {' '}
                    </p>

                    <p style={{margin: '10px 0'}}>
                    4. The services, support, documentation, and any other services, data, and content 
                    (inclusive of Third-Party services and all Third-Party items, products, devices and/or materials) 
                    provided by PHAMTOM under these terms and conditions or as part of the services are provided “as is” and 
                    “as-available,” with all faults, and without warranty of any kind. PHAMTOM disclaims all warranties, 
                    express and implied, including, but not limited to, the implied warranties of merchantability, fitness 
                    for a particular purpose, quiet enjoyment, quality of information, and title/non-infringement. The 
                    healthcare acknowledges and agrees that (i) PHAMTOM shall have no liability with respect to the acts or 
                    omissions of PHAMTOM’s subcontractors in connection with the provision of services here under; and 
                    (ii) the healthcare’s sole remedy with respect to the acts or omissions of the subcontractors shall be 
                    direct recourse and/or action by the healthcare against the applicable subcontractor. The healthcare expressly 
                    agrees and acknowledges that use of and receipt of the services are at the healthcare’s sole risk, including 
                    errors in information, content, and other output from the services. no oral or written information or advice 
                    given by PHAMTOM, or its authorized representatives shall create any warranties, product endorsements or 
                    medical advice, or in any way increase the scope of PHAMTOM’s obligations under this agreement. 
                    PHAMTOM does not endorse any Third-Party service contained within the content of the licensed services. 
                    the listing of Third-Party product within the services in no way constitutes an endorsement of such by PHAMTOM, 
                    nor any representation or warranty as to the safety, efficacy or appropriateness of any Third-Party product. 
                    PHAMTOM provides no professional or medical advice as to any product, equipment, service or Third-Party item 
                    or use of any product, equipment or Third-Party service. PHAMTOM shall have no liability of any kind to the 
                    healthcare in connection with the healthcare’s procurement or use of any equipment, products or Third-Party 
                    item. purchase and/or use of any Third-Party product cited within the services is at the healthcare’s sole risk. {' '}
                </p>

                <p style={{margin: '10px 0'}}>
                    5. The services may be used to access and transfer information over the internet and to link to 
                    Third-Party websites. The healthcare acknowledges and agrees PHAMTOM does not operate or control 
                    the internet or the Third Party web sites and: (i) viruses, worms, trojan horses, or other undesirable 
                    data or software; or (ii) unauthorized users (e.g., hackers) may attempt to obtain access to and damage 
                    healthcare’s data, web sites, computers, or networks. PHAMTOM shall not be responsible for such activities. 
                    PHAMTOM does not and cannot control the flow of data to or from PHAMTOM’s network and other portions of the 
                    internet, or the availability of or access to Third Party web sites. Such flow depends in large part on the 
                    performance of internet services provided or controlled by third parties. The actions or inactions of third 
                    parties can impair or disrupt the healthcare’s connections to the internet, access to Third Party web sites 
                    or portions the internet or web sites, and the transmission of data. although PHAMTOM will use commercially 
                    reasonable efforts to take all actions it deems appropriate to remedy and avoid such events, PHAMTOM cannot 
                    guarantee that such events will not occur. Accordingly, PHAMTOM disclaims any and all liability resulting from 
                    or relating to such events. {' '}
                </p>
                <br />
                <h5>PHAMTOM SUBSCRIPTION TERMS</h5> 
                <p style={{margin: '10px 0'}}>
                    If the Healthcare has purchased a license to or has otherwise subscribed to the Services as indicated in 
                    PHAMTOM’s applicable records or if the Healthcare otherwise continues to access or use the Services after 
                    the expiration of any applicable trial period, the Healthcare hereby agrees to the following terms and conditions
                     (which terms and conditions when effective supersede and replace the Trial Terms and Conditions above): • {' '}
                </p> <br />
                <h6>LICENSE AND USE</h6>
                <p style={{margin: '10px 0'}}>
                    a. License Grant: PHAMTOM hereby grants the Healthcare, upon the terms and conditions contained herein, 
                    a limited, non-transferable, non-sublicensable, non-exclusive license for all licensed professionals 
                    associated with the Healthcare, including, without limitation, all physicians, nurses, pharmacists, 
                    physician assistants and therapists (collectively, “Licensed Users”) to use the Services, during the Term, 
                    in accordance with PHAMTOM’s then current documentation and only: (i) in the ordinary course of the 
                    Healthcare’s normal and ordinary internal business, and (ii) in accordance with applicable federal, state, 
                    and local laws, rules, and regulations (“Intended Purpose”). The Healthcare agrees that the Services shall 
                    not be used by any person or entity other than the Licensed Users for the Intended Purpose and shall prevent 
                    any subcontractor or agent of the Healthcare or any other Third Party from using the Services. 
                    The Healthcare acknowledges that the Services will encompass information about items, devices, products 
                    and/or services not owned by PHAMTOM, but instead provided by a Third Party or third parties, inclusive of, 
                    but not limited to, third-party vendors and manufacturers (“Third Party Services”). {' '}
                </p>

                <p style={{margin: '10px 0'}}>
                    b. License Restrictions: In furtherance of Section a hereof, the Healthcare shall not, and shall not permit 
                    any Third Party (including, but not limited to, affiliates, employees or agents of any Third Party) to: 
                    (i) duplicate, modify, decompile or reverse engineer any of the Services for any reason; or (ii) resell 
                    the Services to any unrelated Third Party. This is a license, not a sale. The Healthcare shall not, and shall 
                    not allow anyone to: 
                    <p style={{margin: '10px 0'}}>
                        (1) circumvent any security feature of the Services;
                    </p>  
                    <p style={{margin: '10px 0'}}>
                        (2) use the Services to provide services (including processing, commercial timesharing, rental, sharing, 
                        application service provider, “service office,” or “service bureau” arrangements) to any Third Party;
                    </p>

                    <p style={{margin: '10px 0'}}>
                        (3) permit any Third Party to view, use, access, or copy the Services; or 
                    </p>
                    
                    <p style={{margin: '10px 0'}}>
                        (4) disclose, publish, broadcast, sell, or otherwise redistribute the Services. The Healthcare shall 
                        maintain the confidentiality and security of any password, account, and other 
                        identification information provided with respect to the Services and not to provide it to any other person or 
                        entity (including, but not limited to affiliates, employees or agents of any Third Party). The Healthcare shall 
                        be responsible for all use of, and activities that occur under, its password(s), account, and other 
                        identification information and for any actions that take place through its access to the Services 
                        (whether conducted by the Healthcare or another). The Healthcare agrees to use the Services only for the 
                        Intended Purpose. {' '}
                    </p>
                     
                </p>

                <p style={{margin: '10px 0'}}>
                    c. Modification: PHAMTOM reserves the right to modify the Services and their respective features and 
                    functionality at any time, without notice or warning and without liability. PHAMTOM shall have the right to add, 
                    drop, modify, or replace, all or any part of the Third-Party Services at any time. {' '}
                </p>

                <p style={{margin: '10px 0'}}>
                    d. Reservation of Rights: PHAMTOM reserves the right to display the PHAMTOM brand, trademarks, logo, 
                    and any image, name, brand, or label which PHAMTOM has rights to, on any and all of the Services. 
                    PHAMTOM reserves all rights not expressly granted to the Healthcare in this Agreement. {' '}
                </p>

                <p style={{margin: '10px 0'}}>
                    e. Suspension of Access: PHAMTOM may, in its sole discretion, suspend the Healthcare’s access to the Services for any of the following reasons (i) to prevent damages to, or degradation of, the Services; (ii) to comply with any law, regulation, court order, or other governmental request; (iii) if the Healthcare breaches any provision set forth in this Agreement; (iv) to otherwise protect PHAMTOM from potential legal liability; and/or (v) in the event the License remains unpaid for more than fifteen (15) or more days from the date such fee is due to PHAMTOM from the Healthcare, PHAMTOM may, as an accommodation to the Healthcare, provide the Healthcare with notice prior to or promptly following any suspension of the Services, but is under no legal obligation to do so. PHAMTOM will restore access to the Services as soon as the event giving rise to suspension has been resolved. 
                    {' '}
                </p>

                <p style={{margin: '10px 0'}}>
                    f. User Compliance: The Healthcare represents, warrants, and covenants that it will cause all of its Licensed Users to comply with the terms of this Agreement and shall be primarily responsible for all use of the Services by its Licensed Users and such Licensed Users failure to comply with the terms and conditions of this Agreement. 
                    {' '}
                </p>

                <p style={{margin: '10px 0'}}>
                    g. Advertising and Promotions on Services: PHAMTOM will have the sole and exclusive right to offer and sell advertising, promotion, merchandising or marketing services (including, but not limited to banners, links, marketing services, promotions, product tie-ins, and product or service merchandising) to third parties on or through the Services. 
                </p>

                <p style={{margin: '10px 0'}}>
                    h. Business Associate: In maintaining, using, and affording access to the Healthcare’s Health Information 
                    in accordance with this Agreement, PHAMTOM will, in accordance with the requirements of The Health Insurance 
                    Portability and Accountability Act of 1996 (“HIPAA”), as such requirements are informed by the guidance given 
                    by the United Stated Department of Health and Human Services (or any office or equivalent department or agency): 
                    i. Not use or disclose such information except as permitted or required by this Agreement or as required by law. 
                    ii. Use appropriate safeguards consistent with the requirements of the Security Rule with respect to the Healthcare’s 
                    Health Information to prevent the use or disclosure of such information in a manner inconsistent with the provisions of 
                    this Agreement; iii. Report to the Healthcare any use or disclosure of the Healthcare’s Health Information not provided for 
                    by this Agreement of which PHAMTOM becomes aware, including breaches of the Healthcare’s Health Information that meets the 
                    definition of “unsecured protected health information” under HIPAA, in each case as required by 164.410 of HIPAA, and any 
                    security incident (as defined by HIPAA) involving the Healthcare’s Health Information of which we become aware; iv. 
                    In accordance with 164.502(e)(1)(ii) and 164.308(b)(2) of HIPAA, as applicable, ensure that any subcontractors that create, 
                    receive, maintain or transmit the Healthcare’s Health Information on PHAMTOM’s behalf agrees to the same restrictions, 
                    conditions, and requirements that apply to PHAMTOM with respect to such information (as such requirement is interpreted or 
                    applicable in connection with or under HIPAA); and PHAMTOM obtains satisfactory assurances (as such term is interpreted or 
                    applicable in connection with or under HIPAA) that such subcontractors will appropriately safeguard such information 
                    (it being understood, for the avoidance of doubt, that other users of the Services are not our subcontractors); 
                    v. Make available to the Healthcare, the Healthcare’s Health Information in furtherance of the Healthcare’s obligations 
                    under 164.524 of the Privacy Rule; vi. Make available to the Healthcare, the Healthcare’s Health Information in furtherance 
                    of the Healthcare’s obligations to amend and incorporate any amendments to such information in accordance with 164.526 of the 
                    Privacy Rule; vii. Maintain and make available the Healthcare’s Health Information to provide an accounting of disclosures in 
                    accordance with 164.528 of the Privacy Rule; viii. Make our internal practices, books, and records relating to the use and 
                    disclosure of Protected Health Information received from or created or received by PHAMTOM on the Healthcare’s behalf, 
                    available to the Secretary of HHS for purposes of determining the Healthcare’s compliance with the Privacy Rule; and 
                    ix. At termination of this Agreement and provided that all fees payable by the Healthcare to PHAMTOM have been fully paid, 
                    PHAMTOM will provide the Healthcare with a copy of the Healthcare’s Health Information in an electronic form that is 
                    accessible through commercially available hardware and software. The Healthcare may have to purchase such hardware and software 
                    from third parties in order to access the Healthcare’s data, and the Healthcare may have to configure its systems in order to 
                    use the Healthcare’s data in its Healthcare. Upon termination and provided that all fees payable by the Healthcare to PHAMTOM 
                    have been fully paid, PHAMTOM will, if feasible, return or destroy all Protected Health Information received from, or created 
                    or received by PHAMTOM on the Healthcare’s behalf that PHAMTOM still maintains in any form, and retain no copies of such 
                    information; or, if such return or destruction is not feasible (whether for technical, legal, regulatory or operational 
                    reasons), extend the protections of this Agreement to the information and limit further uses and disclosures to those purposes 
                    that make the return or destruction of the information infeasible. • INTELLECTUAL PROPERTY: a. IP Ownership: PHAMTOM shall own 
                    all rights, title, interest and intellectual property rights in (i) the Services (inclusive of the items, materials and data 
                    contained therein), (ii) all materials and technologies used in and/or in connection with the Services, and (iii) any and all 
                    materials and technologies provided by PHAMTOM, and/or developed by PHAMTOM, alone or jointly with others. The Healthcare shall 
                    not use any information or data disclosed by PHAMTOM to the Healthcare in connection with this Agreement to contest the validity 
                    of any PHAMTOM intellectual property. Any such use of PHAMTOM’s information and data shall constitute a material breach of this 
                    Agreement. • SUPPORT AND UPDATES: a. Support: In connection with the license granted hereunder, during its then current support 
                    hours, PHAMTOM shall provide reasonable off-site technical and other support for the Healthcare and the Licensed Users. 
                    b. Updates: PHAMTOM may, from time to time, in its sole discretion, provide Updates to the Healthcare, such updates may be 
                    provided across the platform in the cloud. For purposes of this Agreement, “Updates” means corrections, changes and improvements 
                    to the Services that (i) relate to the operating performance of the Services, but do not change the basic function of the 
                    Services; (ii) are intended for general commercial use in connection with the Services; and (iii) are provided generally to 
                    PHAMTOM’s other customers without additional charge. Updates do not necessarily include new releases or versions of the Services 
                    for which PHAMTOM, in its sole and exclusive discretion, imposes an additional charge. PHAMTOM may, however, in its sole and 
                    exclusive discretion, provide Updates to the Healthcare that include new functionality. Any and all Updates are deemed part of 
                    the Services and shall be protected and governed by the terms and conditions of this Agreement and subject to the license granted 
                    in Section 1. {' '}
                </p>
               

                <h6> • CONFIDENTIALITY </h6>

                <p style={{margin: '10px 0'}}>
                    a. Confidential Information: The Healthcare acknowledges and agrees that the Services constitute valuable and confidential proprietary information and intellectual property of PHAMTOM, that are protected under civil and criminal law and under the laws of patent, copyright and trade secret, and, except as expressly provided herein, shall not be disclosed in any form by the Healthcare to any unauthorized Third Party. Each Party agrees that all information supplied by one Party and its affiliates and agents (collectively, the “Disclosing Party”) to the other (“Receiving Party”) including, without limitation, (i) source code, trade secrets, databases, designs and techniques, engine protocols, models, displays and manuals, and the selection, coordination, and arrangement of the contents of such materials; and (ii) any unpublished information concerning research activities and plans, customers, marketing or sales plans, sales forecasts or results of marketing efforts, pricing or pricing strategies, costs, operational techniques, strategic plans, and unpublished financial information, including information concerning revenues, profits and profit margins will be deemed confidential and proprietary to the Disclosing Party, regardless of whether such information was disclosed intentionally or unintentionally or marked as “confidential” or “proprietary” (“Confidential Information”). The Services shall be deemed Confidential Information of PHAMTOM. 
                </p>

                <p style={{margin: '10px 0'}}>
                    b. Exclusions: Confidential Information will not include any information or material, or any element thereof, whether or not such information or material is Confidential Information for the purposes of this Agreement, to the extent any such information or material, or any element thereof: (a) has previously become or is generally known, unless it has become generally known through a breach of this Agreement or a similar confidentiality or nondisclosure agreement, obligation or duty; (b) was already rightfully known to the Receiving Party prior to being disclosed by or obtained from the Disclosing Party as evidenced by written records kept in the ordinary course of business or by proof of actual use by the Receiving Party; (c) has been or is hereafter rightfully received by the Receiving Party from a third person (other than the Disclosing Party) without restriction or disclosure and without breach of a duty of confidentiality to the Disclosing Party; or (d) has been independently developed by the Receiving Party without access to Confidential Information of the Disclosing Party. It will be presumed that any Confidential Information in a Receiving Party’s possession is not within exceptions (b), (c) or (d) above, and the burden will be upon the Receiving Party to prove otherwise by records and documentation. 
                </p>

                <p style={{margin: '10px 0'}}>
                    c. Treatment of Confidential Information: Each Party recognizes the importance of the other’s Confidential Information. In particular, each Party recognizes and agrees that the Confidential Information of the other is critical to their respective businesses and that neither Party would enter into this Agreement without assurance that such information and the value thereof will be protected as provided in this Section 5 and elsewhere in this Agreement. Accordingly, each Party agrees as follows: (a) the Receiving Party will hold any and all Confidential Information it obtains in strictest confidence and will use and permit use of Confidential Information solely for the purposes of this Agreement; (b) the Receiving Party may not disclose or provide access to anyone except the Healthcare; and (c) the Receiving Party currently has, and for so long as it possesses Confidential Information of the Disclosing Party, it will maintain in effect and enforce, rules and policies to protect against access to or use or disclosure of Confidential Information other than in accordance with this Agreement, including without limitation written instruction to and agreements with employees and agents who are bound by an obligation of confidentiality no less restrictive than set forth in this Agreement to ensure that such employees and agents protect the confidentiality of Confidential Information. The Receiving Party will instruct and require its employees and agents not to disclose Confidential Information to third parties, including without limitation customers, subcontractors or consultants, without the Disclosing Party’s prior written consent; and will notify the Disclosing Party immediately of any unauthorized disclosure or use, and will cooperate with the Disclosing Party to protect all proprietary rights in and ownership of its Confidential Information. 

                </p>

                <p style={{margin: '10px 0'}}>
                    d. Non-Exclusive Equitable Remedy: Each Party acknowledges and agrees that due to the unique nature of Confidential Information there can be no adequate remedy at law for any breach of its obligations hereunder, that any such breach or threatened breach may allow a Party or third parties to unfairly compete with the other Party resulting in irreparable harm to such party, and therefore, that upon any such breach or any threat thereof, each Party will be entitled to appropriate equitable remedies and may seek and obtain injunctive relief from a court of competent jurisdiction without the necessity of proving actual loss or posting of a bond or other security, in addition to whatever remedies either of them might have at law or equity. Any breach of this Section 5 will constitute a material breach of this Agreement and be grounds for immediate termination of this Agreement in the exclusive discretion of the non-breaching party. 

                </p>

                <p style={{margin: '10px 0'}}>
                    e. NONDISPARAGEMENT: The Healthcare shall not hereafter disparage and/or portray PHAMTOM in a negative light through the verbal and/or written publication of false, negative and/or injurious statements that are derogatory of PHAMTOM’s officers, directors, employees, property, business, products and/or services. 

                </p>

                <h6> • NO WARRANTIES; THIRD PARTY DISCLAIMER  </h6>

                <p style={{margin: '10px 0'}}>
                    a. Except as expressly provided herein, the services, support, documentation, and any other services, data, and content (inclusive of third-party services and any and all third-party items, products, devices and/or materials) provided by PHAMTOM under this agreement or as part of the services are provided “as is” and “as-available,” with all faults, and without warranty of any kind. PHAMTOM disclaims all warranties, express and implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, quiet enjoyment, quality of information, and title/non-infringement. the healthcare acknowledges and agrees that (i) PHAMTOM shall have no liability with respect to the acts or omissions of PHAMTOM’s subcontractors in connection with the provision of services hereunder; and (ii) the healthcare’s sole remedy with respect to the acts or omissions of the subcontractors shall be direct recourse and/or action by the healthcare against the applicable subcontractor. the healthcare expressly agrees and acknowledges that use of and receipt of the services are at the healthcare’s sole risk, including errors in information, content, pricing, and other output from the services. no oral or written information or advice given by PHAMTOM or its authorized representatives shall create any warranties, product endorsements or medical advice, or in any way increase the scope of PHAMTOM’s obligations under this agreement. PHAMTOM does not endorse any third-party service contained within the content of the licensed services. the listing of third-party product within the services in no way constitutes an endorsement of such by PHAMTOM, nor any representation or warranty as to the safety, efficacy or appropriateness of any third-party product. PHAMTOM provides no professional or medical advice as to any product, equipment, service or third-party item or use of any product, equipment, or third-party service. PHAMTOM shall have no liability of any kind to the healthcare in connection with the healthcare’s procurement or use of any equipment, products, or third-party item. purchase and/or use of any third-party product cited within the services is at the healthcare’s sole risk. b. the services may be used to access and transfer information over the internet and to link to third party web sites. the healthcare acknowledges and agrees PHAMTOM does not operate or control the internet or the third-party web sites and: (i) viruses, worms, trojan horses, or other undesirable data or software; or (ii) unauthorized users (e.g., hackers) may attempt to obtain access to and damage healthcare’s data, web sites, computers, or networks. PHAMTOM shall not be responsible for such activities. PHAMTOM does not and cannot control the flow of data to or from PHAMTOM’S network and other portions of the internet, or the availability of or access to third party web sites. such flow depends in large part on the performance of internet services provided or controlled by third parties. the actions or inactions of third parties can impair or disrupt the healthcare’s connections to the internet, access to third party web sites or portions the internet or web sites, and the transmission of data. although PHAMTOM will use commercially reasonable efforts to take all actions it deems appropriate to remedy and avoid such events, PHAMTOM cannot guarantee that such events will not occur. accordingly, PHAMTOM disclaims any and all liability resulting from or relating to such events. 

                </p>

                <h6> • LIMITATION OF LIABILITY </h6>

                <p style={{margin: '10px 0'}}>
                    a. The healthcare agrees that neither PHAMTOM, nor any of its officers, directors, affiliates, employees or agents shall in any event be liable (i) for any direct, special, indirect, incidental, consequential, punitive, exemplary or any other damages regardless of kind or type (whether in contract, tort (including negligence), or otherwise), including but not limited to loss of profits, business interruption, personal injury, property damage, loss of business profits, loss of business information, data, or goodwill, regardless of whether PHAMTOM knew or should have known of the possibility of such damages; or (ii) for any damages whatsoever in connection with, or in any way related to, the services and/or any third party service. The healthcare waives any and all claims, now known or later discovered, that it may have against PHAMTOM arising out of this agreement and the services. b. In any event, PHAMTOM’s total cumulative liability to customer for all damages, losses, and causes of action (whether in contract, tort (including negligence), or otherwise) relating in any way to this agreement shall not exceed one times the amount of the license fees paid during the preceding term by the healthcare to PHAMTOM. c. The healthcare acknowledges and agrees that it shall be solely and fully responsible for its reliance on and use of any third-party data and for any liability or damages arising therefrom. For the purposes of this section 8(c), third party data shall include all data, information and materials submitted to PHAMTOM by the healthcare, PHAMTOM’s customers and subscribers. The healthcare further agrees that it will hold harmless and forever release and discharge PHAMTOM from and against any liability or damages arising out of the healthcare’s use or reliance on any third-party data. d. The limitation of liability and types of damages stated in this agreement are intended by the parties to apply regardless of the form of lawsuit or claim a party may bring, whether in tort, contract or otherwise. The limitations of liability and disclaimers of warranties provided in this agreement form an essential basis of the bargain between the parties and shall continue to apply even if any exclusive remedy hereunder fails of its essential purpose. 

                </p>

                <h6>• INJUNCTIVE RELIEF.</h6>
                <p style={{margin: '10px 0'}}>
                a. The Healthcare acknowledges that the provisions set forth in Sections 1, 3, 5, 6, 7, 8, 9 and 11 are necessary to protect the business, goodwill, and other proprietary interests of PHAMTOM. In the event of any breach or threatened breach of the above cited provisions, the Healthcare acknowledges PHAMTOM shall incur irreparable damage for which there will be no adequate remedy at law. Accordingly, if the Healthcare or any of its agents or representatives breaches or threatens to breach any of the foregoing provisions, PHAMTOM shall be entitled, in addition to and without prejudice to all other rights and remedies available to it, an injunction (without any bond or other security being required therefor) restraining any breach of the foregoing provisions by the Healthcare or its agents or representatives. 

                </p>

                <h6>• TERM AND TERMINATION </h6>
                <p style={{margin: '10px 0'}}>
                    a. Term: This Agreement shall commence on the Effective Date and continue until terminated in accordance with Section 10(b) hereof (the “Term”). For purposes hereof, the term “Effective Date” shall mean the date the PHAMTOM provides Healthcare with logical access to use the Services after Healthcare signs up for PHAMTOM’s services. b. Termination: Either Party may terminate this Agreement on written notice to the other Party if the other Party is in material breach of its obligations hereunder and fails to cure the breach within thirty (30) days of such written notice. In addition, either Party may, in its sole discretion, elect to terminate this Agreement on written notice to the other Party upon the bankruptcy or insolvency of the other Party or upon the commencing voluntary or involuntary winding up, or upon the filing of any petition seeking the winding up of the other Party. Notwithstanding the foregoing or any other provision of this Agreement, at any time the Healthcare may terminate this Agreement for convenience, without cause or liability for such termination, on thirty (30) days prior written notice to PHAMTOM. c. Effect of Termination: The Healthcare shall be liable for all fees and charges incurred prior to the date of termination and shall not be entitled to a refund of any License Fees paid by the Healthcare prior to the date of termination. All such fees are non-refundable. Upon termination, the Healthcare shall immediately return to PHAMTOM, at PHAMTOM’s expense, the original and all copies of Confidential Information furnished by PHAMTOM to the Healthcare hereunder. d. Survival: In addition to any provisions of this Agreement which continue by its terms, the provisions of Sections 3, 5, 6, 7, 8, 9 and 11 survive termination of this Agreement for any reason. 

                </p>

                <h6>• MISCELLANEOUS</h6>
                <p style={{margin: '10px 0'}}>
                     a. Independent Contractors: Each Party hereto is an independent contractor, and nothing contained herein shall be construed to create a partnership, joint venture or agency relationship between PHAMTOM and the Healthcare, nor shall either Party be authorized to bind the other in any way. b. Remedies Not Exclusive; No Waiver; Amendments: Except as otherwise specifically provided herein, no remedy referred to in this Agreement is intended to be exclusive. No delay by either Party in exercising any of their respective rights or remedies hereunder shall be deemed to be a waiver of such rights or remedies. No waiver by either Party of any rights under this Agreement or breach by the other Party hereunder shall in any way be a waiver of any such rights in the future or any future breach. Any waiver, amendment or modification of this Agreement must be in writing and signed by the party against whom enforcement is sought. c. De-Identified Information: In consideration of the provision of the Services by PHAMTOM, the Healthcare hereby transfers and assigns to PHAMTOM all right, title and interest in and to all De-Identified Information (as defined below) that PHAMTOM makes from the Healthcare’s Information pursuant to Section 11(c)(i). The Healthcare agrees that PHAMTOM may use, disclose, market, license and sell such De-Identified Information for any purpose without restriction, and that the Healthcare has no interest in such information, or in the proceeds of any sale, license, or other commercialization thereof. The Healthcare acknowledges that the rights conferred by this Section are a principal component of the consideration for the provision of the Services, without which PHAMTOM would not enter into this Agreement. In that regard, the Healthcare hereby grants to PHAMTOM a non-exclusive, royalty-free, fully paid-up, perpetual, irrevocable, worldwide and fully sublicensable right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, exploit, sell, commercialize, and display any information, material or work product (other than the Healthcare’s Information that has not been De-Identified) the Healthcare provides or uploads to PHAMTOM’s website or the Services. The Healthcare agrees that PHAMTOM may use, disclose, market, license, and sell such information and works, including derivative products, without restriction. This includes, for example, custom templates that the Healthcare creates using the Services, and information (other than the Healthcare’s Information that has not been De-Identified) that the Healthcare contributes to forums, discussion groups and the like. The Healthcare may provide content or material to this site by participating in forums, discussion groups and the like, or by using the site to create custom templates and the like. Furthermore, the Healthcare agrees that PHAMTOM may use, disclose, market, license and sell such material or content, and that the Healthcare has no interest in the information, or in the proceeds of any sale, license, or other commercialization thereof. The Healthcare warrants and agrees that any material the Healthcare provides will not infringe or otherwise violate the intellectual property or other rights of others, and will not be otherwise unlawful, infringing, threatening, libelous, defamatory, obscene, pornographic, or in violation of any law. i. PHAMTOM may De-Identify (as defined below) the Healthcare’s Information, and use, exploit, license, commercialize, and disclose De-Identified Information for any purpose whatsoever, including as provided by Section 11(c) and Section 11(c)(iii). ii. Without limiting the provisions of Section 11(c), the Healthcare agrees that PHAMTOM may provide De-Identified Health Information and other information (including The Healthcare’s Personal Information and information concerning the Healthcare) to any medical group, independent Healthcare association of physicians, health plan or other organization with which the Healthcare has a contract to provide medical services, or to whose members or enrollees the Healthcare provides medical services. Such information may identify the Healthcare or its members, owners, or employees, but will not identify any individual to whom the Healthcare provides services. Such information may include, without limitation, aggregated data concerning the Healthcare’s patients, diagnoses, procedures, orders, and the like. iii. For purposes of this Agreement, the following terms shall have the following meanings: 1. The term “De-Identified Health Information” means health information that has been de-identified in accordance with the provisions of the Privacy Rule; 2. The term, “De-Identified Information” means De-Identified Health Information and De-Identified Personal Information. 3. The term “De-Identified Personal Information” means Personal Information from which all identifiers that could reasonably be anticipated to identify an individual by an anticipated recipient – such an individual’s name, contact information, or government identifiers – have been removed. 4. The term “De-Identify,” means (i) with respect to Personal Information, to make such information into De-Identified Personal Information, and (ii) with respect to health information, means to make such health information into De-Identified Health Information. 5. The term “Personal Information” means information that includes an individual’s name, contact information, government identifiers, or includes identifiers that could reasonably be anticipated to identify an individual personally by an anticipated recipient. 6. The term “Healthcare’s Health Information” means Protected Health Information that the Healthcare or its Workforce inputs or uploads onto the Services, or that PHAMTOM receives on behalf of the Healthcare from its patients, authorized service providers, or PHAMTOM’s Third Party partners pursuant to this Agreement. 7. The term “Healthcare’s Information” means information that the Healthcare or its Workforce enters or uploads onto the Services, including the Healthcare’s Personal Information and the Healthcare’s Health Information. 8. The term “Healthcare’s Personal Information” means Personal Information that the Healthcare or its Workforce enters or uploads onto the Services. 9. The term “Workforce” means the Healthcare’s owners, employees, personnel, volunteers, trainees, subcontractors, vendors, and other persons whose conduct, in the performance of work for the Healthcare, is under the direct control of the Healthcare, whether they are paid by the Healthcare. d. Assignment and Sublicense: Neither Party shall assign this Agreement without the prior written consent of the other Party, which consent shall not be unreasonably withheld; provided; however, that PHAMTOM shall have the ability, without the Healthcare’s consent, to subcontract or delegate all or part of the Services to subcontractors (collectively, the “Subcontractors”). Furthermore, the Healthcare acknowledges and agrees that the Services may not be sublicensed or otherwise transferred voluntarily or by operation of law to any Third Party. Any attempted assignment, license, sublicense, or transfer by the Healthcare, whether voluntary or involuntary, shall be void and shall be grounds for immediate termination of this Agreement. Subject to the foregoing, this Agreement shall be binding upon and shall inure to the benefit of the successors and permitted assigns of the parties hereto. e. Governing Law and Venue: This Agreement and the rights of the parties hereto shall be governed by the laws of the State of Texas without regard to principles of conflict of laws. In the event of any litigation arising out of, or relating to, this Agreement or the breach thereof, the venue for any such action shall be in the State or Federal courts located in Collin or Denton County, Texas. f. Severability; Captions: If any provision of this Agreement is held to be invalid or unenforceable for any reason, such provision shall be conformed to prevailing law rather than voided, if possible, in order to achieve the intent of the parties and, in any event, the remaining provisions of this Agreement shall remain in full force and effect and shall be binding upon the parties hereto. The captions of this Agreement are solely for reference and have no legal effect whatsoever and shall not in any way affect the interpretation or construction of this Agreement. g. Force Majeure: Neither Party shall be liable for damage due to any cause beyond its control, including, without limitation, acts of God, acts of civil or military authority, labor disputes, failure or delay of suppliers or systems, including communications and power systems, fire, sabotage, war, embargo or acts or omissions of the other Party caused by any of such events. h. Compliance with Laws: The Healthcare shall comply with all applicable laws and regulations, including, but not limited to, those laws and regulations governing its use of the Services. PHAMTOM shall use reasonable efforts to comply with applicable laws and regulations in its performance of this Agreement and the provision of the Services. i. Notices: No notice or other communication shall be deemed given unless sent in any of the manners, and to the persons, as specified in this paragraph. All notices and other communications hereunder shall be in writing and shall be deemed given: (a) upon receipt if delivered personally (unless subject to clause (b) or if mailed by registered or certified mail receipt requested, postage prepaid; (c) at noon on the business day after dispatch if sent by a nationally recognized overnight courier, to the address below: 1. If to PHAMTOM: PHAMTOM HEALTH TECHNOLOGIES RC: 1867522, 5B, QUIVERS COURT, OKE IRA NLA, AJAH, LAGOS STATE If to the Healthcare: To the address provided by the Healthcare during its initial trial user account registration process, and if no such initial trial user account registration occurred, then the Healthcare’s address as reflected in PHAMTOM’s books and records. j. Publicity: The Healthcare acknowledges and agrees PHAMTOM may identify the Healthcare as a client in its client listings, web sites, and other promotional materials. In addition, PHAMTOM may issue press releases regarding the parties’ relationship under this Agreement. At PHAMTOM’s request, the Healthcare agrees to provide PHAMTOM with a jpeg file containing its corporate name and logo. The Healthcare hereby give permission and grants PHAMTOM the license and right to use the logo for the purposes set forth in this Agreement and in its communications with third parties. k. Entire Agreement: This Agreement constitutes the entire agreement between PHAMTOM and the Healthcare pertaining to the subject matter hereof and supersedes all proposals or prior and contemporaneous agreements or understandings of the parties regarding such matter. l. Authority: The person signing below represents and warrants that he or she has authority to enter into this Agreement on behalf of his or her organization and bind such organization to the terms of this Agreement.

                </p>

                <p style={{margin: '10px 0'}}>
                    © Phamtom Inc. 2023
                </p>






                  </div>
                </div>
              {/* </div> */}
            </section>

            {/* our solutions */}
            {/* <section>
              <div className='our_solutions_container'>
                <div className='our_solutions'>
                  <h5>Our Solutions</h5>
                  <p>
                    PHAMTOM offers desktop and mobile based apps to solve these
                    challenges.
                  </p>
                </div>

                <ul className='solution_cards_container'>
                  {solutions.map((solution, index) => (
                    <li key={index} className='solution_card'>
                      <div className='card_img'>
                        <Image
                          src={solution.image}
                          height={solution.height}
                          width={solution.width}
                        />
                      </div>
                      <div className='card_content'>
                        <h6>{solution.title}</h6>
                        <p>{solution.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section> */}
          </div>

          <div style={{ marginTop: '240px', marginBottom: '-20px' }}>
            <Banner
              height={screenSize.width >= 821 ? '300px' : '200px'}
              linkName='Get started'
              linkTo='/auth/signup'
              content='Signup to join our rapidly growing community of digital healthcare providers today.'
            />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Terms;
