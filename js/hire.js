$(function () {
    getCompany().done(value => {
        getHire().done(val => {
            let html = ''
            val.content.forEach((item,index) => {
                    html += `<div class="hire-item" id=${item.id}>
                    <a class="hire-btn" href="mailto:${value.jobEmail}">一键投递</a>
                    <div class="hire-title">${item.name}</div>
                    <div class="hire-date">发布时间：${item.modifiedTime}</div>
                    <div class="hire-info">
                        <div>招聘人数：${item.num}</div>
                        <div>工作地点：${item.place}</div>
                        <div>最低学历：${item.education}</div>
                        <div>工作经验：${item.experience}</div>
                    </div>
                    <div class="hire-content" style="margin-top: 20px;">
                        <h4>工作职责: </h4>
                        <div class="ql-editor">${item.duty}</div>
                    </div>
                    <div class="hire-content" style="margin-top: 20px;">
                        <h4>任职要求: </h4>
                        <div class="ql-editor">${item.requirement}</div>
                    </div>
                </div>`
            })
            $('#hire').html(html)
        })
    })
});