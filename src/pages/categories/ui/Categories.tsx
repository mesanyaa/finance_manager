import { Layout } from '../../layout';
import { CategoriesSidePanel } from '../../../widgets';

import { Splitter } from 'antd';

const CategoriesPage = () => {
    return (
        <Layout>
            <Splitter>
                <Splitter.Panel>
                    <CategoriesSidePanel categoryType="Доходы" />
                </Splitter.Panel>
                <Splitter.Panel>
                    <CategoriesSidePanel categoryType="Расходы" />
                </Splitter.Panel>
            </Splitter>
        </Layout>
    );
};

export { CategoriesPage };
