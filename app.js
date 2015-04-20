// app.js
(function ($) {
    "use strict";

    var tasklists, deleteMessage;

    tasklists = $('#tasks-list');
    deleteMessage = 'Would you like to delete it?';

    function findTask(task) {
        var taskExists, tasks;

        tasks =  tasklists.find('.task');

        if (tasks.length < 1) {
            return false;
        }

        taskExists = false;

        tasks.each(function () {
            if (task === this.innerText) {
                taskExists = true;
                return false;
            }
        });

        return taskExists;
    }

    function addTask(e) {
        e.preventDefault();

        var taskInput, newTask;

        taskInput = e.target.elements.task;

        // Add just unique tasks.        
        newTask = taskInput.value;
        if (!newTask) {
            return false;
        }
        if (findTask(newTask)) {
            return false;
        }

        // Add the task to the DOM
        tasklists.append('<li class="task clear">' + newTask + 
            '<a href="/" class="delete-task float-right"></a></li>');

        // Focus and reset into
        taskInput.value = '';
        taskInput.focus();
    }

    function updateTask(e) {
        tasklists.find(e.target).toggleClass('checked');
    }

    function deleteTask(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm(deleteMessage)) {
            tasklists.find(e.target.parentNode).remove();
        }
    }

    // Bind events
    $('#new-task').on('submit', addTask);
    tasklists.on('click', '.task', updateTask);
    tasklists.on('click', '.delete-task', deleteTask);
}(jQuery));
