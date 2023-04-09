import { Col, Row, Image } from 'antd';
import './TermsAndConditions.css';
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '5%',
  paddingBottom: '5%',
};

const imageStyle = {
  width: 300,
  height: 200,
  borderRadius: '5%',
};

const textStyle = {
  fontWeight: 400,
  fontStyle: 'italic',
};

function TermsAndConditions() {
  return (
    <>
      <div className="homePageWrapper">
        <Row style={{ height: '70%' }}>
          <Col
            md={24}
            lg={{}}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              background: 'white',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            <h1>Terms and Conditions for Estate Manager Web Application</h1>
            <ol>
              <li>
                Acceptance of Terms: By accessing or using the online estate management web
                application (the "Application"), you agree to be bound by these Terms and Conditions
                ("Terms"). If you do not agree to these Terms, you may not use the Application.
              </li>
              <li>
                User Accounts: In order to access certain features of the Application, you may be
                required to create a user account. You are responsible for maintaining the
                confidentiality of your account information, including your username and password.
                You agree to notify us immediately of any unauthorized use of your account.
              </li>
              <li>
                Use of the Application: You agree to use the Application solely for its intended
                purpose, which is to manage and organize estate-related tasks and information. You
                shall not use the Application for any illegal, fraudulent, or unauthorized purposes.
              </li>
              <li>
                User Content: You may submit content, such as text, images, and other materials
                ("User Content"), to the Application. By submitting User Content, you grant us a
                non-exclusive, royalty-free, perpetual, irrevocable, and worldwide license to use,
                reproduce, modify, adapt, publish, translate, distribute, and display such User
                Content in connection with the Application.
              </li>
              <li>
                Intellectual Property: The Application and all of its content, including but not
                limited to text, graphics, logos, icons, images, audio clips, and software, are
                owned by us or our licensors and are protected by applicable intellectual property
                laws. You may not copy, modify, reproduce, distribute, transmit, display, or
                otherwise use any content from the Application without our prior written consent.
              </li>
              <li>
                Privacy: We collect and use personal information in accordance with our Privacy
                Policy, which is incorporated into these Terms by reference. By using the
                Application, you consent to the collection and use of your personal information as
                described in our Privacy Policy.
              </li>
              <li>
                Prohibited Conduct: You shall not use the Application to: (a) upload, post, email,
                or otherwise transmit any content that is unlawful, harmful, threatening, abusive,
                harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, or
                racially, ethnically, or otherwise objectionable; (b) impersonate any person or
                entity or falsely state or otherwise misrepresent your affiliation with a person or
                entity; (c) upload, post, email, or otherwise transmit any unsolicited or
                unauthorized advertising, promotional materials, "junk mail," "spam," "chain
                letters," "pyramid schemes," or any other form of solicitation; (d) upload, post,
                email, or otherwise transmit any content that contains viruses, worms, or any other
                computer code, files, or programs that may interrupt, destroy, or limit the
                functionality of any computer software or hardware or telecommunications equipment;
                or (e) interfere with or disrupt the Application or servers or networks connected to
                the Application, or disobey any requirements, procedures, policies, or regulations
                of networks connected to the Application.
              </li>
              <li>
                Indemnity: You agree to indemnify and hold us harmless from and against any and all
                claims, liabilities, damages, losses, costs, and expenses, including reasonable
                attorneys' fees, arising out of or in any way connected with your use of the
                Application or any violation of these Terms.
              </li>
              <li>
                Disclaimer of Warranties: THE APPLICATION IS PROVIDED ON AN "AS IS" AND "AS
                AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM
                ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
                FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. WE DO NOT WARRANT THAT THE
                APPLICATION WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </li>
              <li>
                Limitation of Liability: IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY
              </li>
            </ol>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TermsAndConditions;
