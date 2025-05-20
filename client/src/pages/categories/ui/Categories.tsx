import { Layout } from '../../layout';
import { CategoriesSidePanel } from '../../../widgets';

import { Splitter } from 'antd';

const CategoriesPage = () => {
    return (
        <Layout>
            <Splitter>
                <Splitter.Panel min="20%" max="80%">
                    <CategoriesSidePanel categoryType="income" />
                </Splitter.Panel>
                <Splitter.Panel min="20%" max="80%">
                    <CategoriesSidePanel categoryType="expense" />
                </Splitter.Panel>
            </Splitter>
        </Layout>
    );
};

export { CategoriesPage };
