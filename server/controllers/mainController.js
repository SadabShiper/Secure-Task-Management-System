

exports.homepage = async(req,res)=>{
    const locals ={
        title : "Task Management System",
        description : "Noice Thing"
    }

    res.render('index',{
        locals,
        layout : '../views/layouts/front-page.ejs'
    });
}

exports.about = async(req,res)=>{
    const locals ={
        title : "About Task Management System",
        description : "Noice Thing"
    }

    res.render('about', locals);
}