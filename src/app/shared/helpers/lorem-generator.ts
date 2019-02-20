export function lorem(count: number) {
    return ('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aspernatur ' +
        'dolor dolores eos et eum explicabo iste magni maiores minus nulla, porro quasi quo ' +
        'suscipit tenetur, ullam. Ad, adipisci aliquam illum iste iusto natus nisi nostrum. ' +
        'Aliquid aperiam aspernatur at atque dolor dolorem doloremque eaque est ex explicabo ' +
        'inventore libero magni nihil numquam placeat possimus repellendus, reprehenderit sunt ' +
        'suscipit tenetur. Debitis deleniti eius, harum illo, iure laboriosam laudantium, maiores ' +
        'modi molestiae numquam perspiciatis placeat quod sit tempore vitae. Accusamus asperiores,' +
        ' esse expedita fugit nulla tempore vel! Assumenda blanditiis, commodi ducimus inventore' +
        ' ipsa nobis optio quos saepe tempora tempore totam!')
        .split(' ')
        .slice(0, count)
        .join(' ');
}
