export default class Datetime {
    // retorna a data convertida em texto no formato (aaaa-mm-dd) (a: ano, m: mês, d: dia)
    static yyyymmdd(date: Date) {
        return date.toISOString().split("T")[0];
    }
    // retorna as horas e minutos da data em texto no formato (hh:mm) (h: hora, m: minuto) 
    static hhmm(date: Date) {
        return date.toTimeString().split(" ")[0].slice(0, 5);
    }
    // expressão regular para o formato (aaaa-mm-dd hh:mm), junção dos formatos acima
    private static datetimeFormat = new RegExp('\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}');
    // retorna a data como um objeto Date a partir de dois textos, que devem estar no formato (aaaa-mm-dd) e (hh:mm) (vide acima) 
    static toDate(date: string, time: string) {
        let dt = `${date} ${time}`
        if (this.datetimeFormat.test(dt)===false) { // verifica se está no formato correto para construir um objeto Date
            return null;
        }
        return new Date(dt);
    }
    // retorna a formatação padrão do local da data para visualização
    static toDateString(date: Date) {
        return date.toLocaleString().slice(0, -3);
    }
}