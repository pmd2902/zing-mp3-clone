/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import request from '~/utils/axios';

import Carousel from '~/layouts/components/Carousel';

import Loading from '../Loading';
import Section from '~/components/Section';
import Item from '~/components/Item';

function Home() {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFail, setIsFail] = useState(false);

    useEffect(() => {
        request.get('/home').then((res) => {
            setIsLoading(false);
            setResult(res.data.items);
            document.title = 'Zing Mp3';
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else if (isFail) {
        return <h1>Bi Loi</h1>;
    } else {
        return (
            <div>
                <Carousel data={result[0]} />
                {result.map(
                    (playlist, index) =>
                        playlist.sectionType === 'playlist' && (
                            <Section key={index} title={playlist.title}>
                                {playlist.items.map((item) => (
                                    <Item key={item.encodeId} data={item} />
                                ))}
                            </Section>
                        ),
                )}
            </div>
        );
    }
}

export default Home;
