import { convertResultTableHeader } from './util.js';

let c = console.log.bind(document);

export const getAllData=async()=>{
    
}

export const isExistResultTable = () => {
    return document.getElementById('status-table') !== null;
};

export const checkResultTable = () => {
    if (!isExistResultTable()) {
        c('결과가 없습니다');
    }
    return parsingResultTable(document);
};

// 제출 정보 파싱
const parsingResultTable = () => {
    const table = document.getElementById('status-table');
    // 예외처리 추후 추가예정

    const headers = Array.from(table.row[0].cells, (x) => convertResultTableHeader(x.innerText.trim()));

    const list = [];
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const cells = Array.from(row.cells, (x, index) => {
            switch (headers[index]) {
                case 'submissionId':
                    return x.innerText.trim();
                case 'result':
                    return {
                        result: x.innerText.trim(),
                        resultCategory: x.firstChild.getAttribute('data-color').replace('-eng', '').trim(),
                    };
                case 'language':
                    return x.innerText.unescapeHtml().replace(/\/.*$/g, '').trim();
                case 'memory':
                    return x.innerText.trim();
                case 'runtime':
                    return x.innerText.trim();
                case 'codeLength':
                    return x.innerText.trim();
                case 'submissionTime':
                    const el = x.querySelector('a.show-date');
                    if (isNull(el)) return null;
                    return el.getAttribute('data-original-title');
                case 'problemId':
                    const a = x.querySelector('a.problem_title');
                    if (isNull(a)) return null;
                    return {
                        problemId: a.getAttribute('href').replace(/^.*\/([0-9]+)$/, '$1'),
                    };
                default:
                    return x.innerText.trim();
            }
        });
        let obj = {};
        obj.elementId = row.id;
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = cells[j];
        }
        obj = { ...obj, ...obj.result, ...obj.problemId };
        list.push(obj);
    }
    log('TableList', list);
    return list;
};

// 제출 코드 파싱
const getSubmitCode = async (submissionId) => {
    let code = fetch(`https://www.acmicpc.net/source/download/${submissionId}`, { method: 'GET' }).then((res) =>
        res.text()
    );
    return code;
};
