
//используем функцию которая создается в потоке кода(Function Expression)
const postData = async (url, data) => { //отвечает за постинг данных(когда мы отправляем их на сервер)
    //async - говорим что у нас будет какой-то асинхронный код.
    //url - который передаём в - fetch(url)
    //data - данный которые будут постится в - body
    let res = await fetch(url, {   //url - что бы ссылаться на какой-то сервер
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json(); // res(result) - возвращаем результат в формате джейсон(json())
    //наша функция занимается тем - что фечит(посылает запрос на сервер), после получает какой-то ответ от сервера и
    //после трансформирует этот ответ в json() джейсон.
    //  **** стоить заметить что здесь тоже понадобится - await так как...
    //... res.json() здесь тоже возвращается промис и так как эта операция проводится не сразу и мы...
    //... не знаем какойтам большой объект json и сколько времени понадобится что-бы перевести в обычный объект.
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, ${res.status}`);
    }
    return await res.json();
}

export {postData};
// export {getResource};