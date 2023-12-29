const Task = require('../models/Task');
const mongoose = require('mongoose');


exports.dashboard = async(req,res)=>{
    let perPage = 12;
    let page = req.query.page || 1;

    const locals ={
        title : "Dashboard",
        description : "Noice Thing"
    }
    
    try{
        // let perPage = 
        const tasks = await Task.aggregate([
            { $sort: { updatedAt: -1 } },
            { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
            {
              $project: {
                title: { $substr: ["$title", 0, 30] },
                description: { $substr: ["$description", 0, 100] },
              },
            }
            ])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec(); 

          const count = await Task.countDocuments({ user: mongoose.Types.ObjectId(req.user.id) });


        res.render('dashboard/index', {
        userName: req.user.firstName,
        locals,
        tasks,
        layout: "../views/layouts/dashboard",
        current: page,
        pages: Math.ceil(count / perPage)
        });

    }
    catch(err){
        console.log(err);
    }
    
}

exports.dashboardViewTask = async (req, res) => {
    const task = await Task.findById({ _id: req.params.id })
      .where({ user: req.user.id })
      .lean();
  
    if (task) {
      res.render("dashboard/view-task", {
        taskID: req.params.id,
        task,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Something went wrong.");
    }
  };


  exports.dashboardUpdateTask = async (req, res) => {
    try {
      await Task.findOneAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, description: req.body.description}
      ).where({ user: req.user.id });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  exports.dashboardDeleteTask = async (req, res) => {
    try {
      await Task.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  exports.dashboardAddTask = async (req, res) => {
    res.render("dashboard/add", {
      layout: "../views/layouts/dashboard",
    });
  };

  exports.dashboardAddTaskSubmit = async (req, res) => {
    try {
      req.body.user = req.user.id;
      await Task.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  exports.dashboardSearch = async (req, res) => {
    try {
      res.render("dashboard/search", {
        searchResults: "",
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {}
  };
  
  exports.dashboardSearchSubmit = async (req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Task.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          { description: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        ],
      }).where({ user: req.user.id });
  
      res.render("dashboard/search", {
        searchResults,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  exports.dashboardSort = async (req, res) => {
    try {
      const tasksByPriority = await Task.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
        {
          $group: {
            _id: { $ifNull: ['$priority', 'Unspecified'] },
            tasks: { $push: '$$ROOT' },
          },
        },
      ]);
  
      console.log('Tasks by Priority:', tasksByPriority);
  
      const sortedTasks = tasksByPriority.reduce((acc, group) => {
        acc[group._id] = group.tasks;
        return acc;
      }, {});
  
      console.log('Sorted Tasks:', sortedTasks);
  
      res.render('dashboard/sortbypriority', {
        userName: req.user.firstName,
        sortedTasks,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

// dashboardController.js

exports.dashboardDeadline = async (req, res) => {
    try {
      // Implement the logic to fetch tasks with remaining days and hours
      const tasksWithDeadline = await Task.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
        { $sort: { date: 1 } }, // Sort by deadline (date) in ascending order
        {
          $project: {
            title: 1,
            description: 1,
            remainingTime: {
              $subtract: ["$date", new Date()],
            },
          },
        },
      ]);
      console.log('Tasks with Deadline:', tasksWithDeadline);
      // Group tasks by priority
      const tasksByPriority = tasksWithDeadline.reduce((acc, task) => {
        const priority = task.remainingTime < 0 ? "Overdue" : "Upcoming";
        if (!acc[priority]) {
          acc[priority] = [];
        }
        acc[priority].push({
          ...task,
          formattedRemainingTime: formatRemainingTime(task.remainingTime),
        });
        return acc;
      }, {});
  
      function formatRemainingTime(remainingTime) {
        const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
        const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  
        return `${days} days ${hours} hours`;
      }
  
      res.render('dashboard/sortbydeadline', {
        userName: req.user.firstName,
        sortedTasks: tasksByPriority,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  