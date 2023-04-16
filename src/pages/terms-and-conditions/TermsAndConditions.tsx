import { Col, Row, Image } from 'antd';
import './TermsAndConditions.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="termsPageWrapper">
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
              <h1>{t('terms_header')}</h1>
              <ol>
                <li>{t('term_1')}</li>
                <li>{t('term_2')}</li>
                <li>{t('term_3')}</li>
                <li>{t('term_4')}</li>
                <li>{t('term_5')}</li>
                <li>{t('term_6')}</li>
                <li>{t('term_7')}</li>
                <li>{t('term_8')}</li>
                <li>{t('term_9')}</li>
                <li>{t('term_10')}</li>
              </ol>
            </Col>
          </Row>
        </div>
      </motion.div>
    </>
  );
}

export default TermsAndConditions;
