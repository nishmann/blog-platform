import React from 'react';
import { Typography } from 'antd';

import style from './ArticleDetailPage.module.scss';

const { Title, Text } = Typography;

const ArticleDetailPage: React.FC = () => {
  return (
    <div className={style.article__page}>
      <Title>Article Detail Page</Title>
      <Text>
        Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
        Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
        responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes
        ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides: aethere
        Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc,
        hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus
        draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris includere
        etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
      </Text>
    </div>
  );
};

export default ArticleDetailPage;
