/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/db/database.ts":
/*!***********************************!*\
  !*** ./src/server/db/database.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ "sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! pg */ "pg");


dotenv__WEBPACK_IMPORTED_MODULE_1___default().config({ path: '.env.local' });
const database = process.env.POSTGRES_DATABASE || '';
const username = process.env.POSTGRES_USER || '';
const password = process.env.POSTGRES_PASSWORD || '';
const host = process.env.POSTGRES_HOST;
const port = parseInt(process.env.POSTGRES_PORT || '');
const sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0__.Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Puedes cambiar esto según tus necesidades de seguridad
        }
    }
});
sequelize
    .authenticate()
    .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sequelize);


/***/ }),

/***/ "./src/server/db/models/WorkPlan.ts":
/*!******************************************!*\
  !*** ./src/server/db/models/WorkPlan.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MaterialModel: () => (/* binding */ MaterialModel),
/* harmony export */   TaskModel: () => (/* binding */ TaskModel),
/* harmony export */   ToolModel: () => (/* binding */ ToolModel),
/* harmony export */   WorkPlanModel: () => (/* binding */ WorkPlanModel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ "sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../database */ "./src/server/db/database.ts");


class WorkPlanModel extends sequelize__WEBPACK_IMPORTED_MODULE_0__.Model {
    id;
    workname;
    totaltime;
    workdays;
    fidelitypercentage;
    startdate;
    expirationdate;
    note;
    getTasks;
    getTools;
    getMaterials;
    tasks;
    tools;
    materials;
}
class MaterialModel extends sequelize__WEBPACK_IMPORTED_MODULE_0__.Model {
    id;
    name;
    fix;
    index;
    workplanid;
}
class ToolModel extends sequelize__WEBPACK_IMPORTED_MODULE_0__.Model {
    id;
    name;
    breakpoint;
    fix;
    index;
    workplanid;
}
class TaskModel extends sequelize__WEBPACK_IMPORTED_MODULE_0__.Model {
    id;
    title;
    breakpoint;
    index;
    workplanid;
}
WorkPlanModel.init({
    id: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    workname: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,
        allowNull: false,
    },
    totaltime: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: false,
    },
    workdays: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: false,
    },
    fidelitypercentage: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: false,
    },
    startdate: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.DATEONLY,
        allowNull: false,
    },
    expirationdate: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.DATEONLY,
        allowNull: false,
    },
    note: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: "workplan",
    timestamps: false,
    sequelize: _database__WEBPACK_IMPORTED_MODULE_1__["default"]
});
TaskModel.init({
    id: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,
        allowNull: false,
    },
    breakpoint: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.BOOLEAN,
        allowNull: true,
    },
    index: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: true,
    },
    workplanid: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workplan',
            key: 'id'
        }
    }
}, {
    tableName: "task",
    timestamps: false,
    sequelize: _database__WEBPACK_IMPORTED_MODULE_1__["default"]
});
ToolModel.init({
    id: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,
        allowNull: false,
    },
    breakpoint: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.BOOLEAN,
        allowNull: true,
    },
    fix: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.BOOLEAN,
        allowNull: true,
    },
    index: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: true,
    },
    workplanid: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workplan',
            key: 'id'
        }
    }
}, {
    tableName: "tool",
    timestamps: false,
    sequelize: _database__WEBPACK_IMPORTED_MODULE_1__["default"]
});
MaterialModel.init({
    id: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,
        allowNull: false,
    },
    fix: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.BOOLEAN,
        allowNull: true,
    },
    index: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: true,
    },
    workplanid: {
        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workplan',
            key: 'id'
        }
    }
}, {
    tableName: "material",
    timestamps: false,
    sequelize: _database__WEBPACK_IMPORTED_MODULE_1__["default"]
});
WorkPlanModel.hasMany(TaskModel, {
    sourceKey: 'id',
    foreignKey: 'workplanid',
    as: 'tasks'
});
WorkPlanModel.hasMany(ToolModel, {
    sourceKey: 'id',
    foreignKey: 'workplanid',
    as: 'tools'
});
WorkPlanModel.hasMany(MaterialModel, {
    sourceKey: 'id',
    foreignKey: 'workplanid',
    as: 'materials'
});
TaskModel.belongsTo(WorkPlanModel, { foreignKey: 'workplanid' });
ToolModel.belongsTo(WorkPlanModel, { foreignKey: 'workplanid' });
MaterialModel.belongsTo(WorkPlanModel, { foreignKey: 'workplanid' });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkPlanModel);


/***/ }),

/***/ "./src/server/routes/workPlan.ts":
/*!***************************************!*\
  !*** ./src/server/routes/workPlan.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db/models/WorkPlan */ "./src/server/db/models/WorkPlan.ts");


const router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();
// Obtener todos los usuarios
router.get('/planes-de-trabajo', async (req, res) => {
    try {
        const plan = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.WorkPlanModel.findAll({
            include: [{ model: _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.TaskModel, as: 'tasks' }, { model: _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.ToolModel, as: 'tools' }, { model: _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.MaterialModel, as: 'materials' }]
        });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes' });
    }
});
router.post('/planes-de-trabajo', async (req, res) => {
    const { id, workname, workdays, totaltime, fidelitypercentage, startdate, expirationdate, note, tasks, tools, materials } = req.body;
    const workPlan = { id: undefined, workname, workdays, totaltime, fidelitypercentage, note, startdate, expirationdate };
    const newTasks = [];
    const newTools = [];
    const newMaterials = [];
    try {
        const newWorkPlan = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.WorkPlanModel.create(workPlan).then(res => {
            let workPlanId = res.id;
            // TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS
            (tasks.map(async (item) => {
                try {
                    const newTask = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.TaskModel.create({
                        title: item.title,
                        breakpoint: false,
                        workplanid: workPlanId,
                        index: item.index
                    });
                    newTasks.push({
                        ...newTask.dataValues,
                        index: item.index
                    });
                    console.log('Tarea creada:', newTask.toJSON());
                }
                catch (error) {
                    console.error('Error al crear la tarea:', error);
                }
            }));
            // Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools
            (tools.map(async (item) => {
                try {
                    const newTool = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.ToolModel.create({
                        name: item.name,
                        breakpoint: false,
                        fix: false,
                        index: item.index,
                        workplanid: workPlanId
                    });
                    newTools.push({
                        ...newTool.dataValues,
                        index: item.index
                    });
                    console.log('Herramienta creada:', newTool.toJSON());
                }
                catch (error) {
                    console.error('Error al crear la herramienta:', error);
                }
            }));
            // MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS
            (materials.map(async (item, index) => {
                try {
                    const newMaterial = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.MaterialModel.create({
                        name: item.name,
                        fix: false,
                        index: item.index,
                        workplanid: workPlanId
                    });
                    newMaterials.push({
                        ...newMaterial.dataValues,
                        index: index
                    });
                    console.log('Material creado:', newMaterial.toJSON());
                }
                catch (error) {
                    console.error('Error al crear el material:', error);
                }
            }));
        });
        return res.status(200).json({ message: 'Plan de trabajo actualizado correctamente', lists: { tasks: newTasks, tools: newTools, materials: newMaterials } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el plan de trabajo' });
    }
});
router.put('/planes-de-trabajo/:id', async (req, res) => {
    const { id, workname, workdays, totaltime, fidelitypercentage, note, tasks, tools, materials } = req.body;
    const workplanid = req.params.id;
    const newTasks = [];
    const newTools = [];
    const newMaterials = [];
    try {
        const plan = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.WorkPlanModel.findByPk(workplanid, {
            include: [{ model: _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.TaskModel, as: 'tasks' }, { model: _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.ToolModel, as: 'tools' }, { model: _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.MaterialModel, as: 'materials' }]
        });
        if (!plan) {
            return res.status(404).json({ message: 'Plan de trabajo no encontrado' });
        }
        workname && (plan.set("workname", workname));
        plan.set("totaltime", totaltime);
        plan.set("workdays", workdays);
        plan.set("fidelitypercentage", fidelitypercentage);
        plan.set("note", note);
        // TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS   TASKS
        await Promise.all(tasks.map(async (item) => {
            if (item.title && !item.id) {
                try {
                    const newTask = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.TaskModel.create({
                        title: item.title,
                        breakpoint: false,
                        workplanid: parseInt(workplanid),
                        index: item.index
                    });
                    newTasks.push({
                        ...newTask.dataValues,
                        index: item.index
                    });
                    console.log('Tarea creada:', newTask.toJSON());
                }
                catch (error) {
                    console.error('Error al crear la tarea:', error);
                }
            }
            else if (item.title && item.id) {
                try {
                    const editTask = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.TaskModel.findByPk(item.id);
                    if (editTask) {
                        editTask.set('title', item.title);
                        await editTask.save();
                        console.log('Tarea actualizada:', editTask.toJSON());
                    }
                    else {
                        console.log('No se encontró la tarea');
                    }
                }
                catch (error) {
                    console.error('Error al actualizar la tarea:', error);
                }
            }
            if (!item.title && item.id) {
                try {
                    const destroyTask = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.TaskModel.findByPk(item.id);
                    console.log('Tarea destruida:', destroyTask.toJSON());
                    await destroyTask.destroy();
                }
                catch (error) {
                    console.error('Error al destruir la tarea:', error);
                }
            }
        }));
        // Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools   Tools
        await Promise.all(tools.map(async (item) => {
            if (item.name && !item.id) {
                try {
                    const newTool = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.ToolModel.create({
                        name: item.name,
                        breakpoint: false,
                        fix: false,
                        index: item.index,
                        workplanid: parseInt(workplanid)
                    });
                    newTools.push({
                        ...newTool.dataValues,
                        index: item.index
                    });
                    console.log('Herramienta creada:', newTool.toJSON());
                }
                catch (error) {
                    console.error('Error al crear la herramienta:', error);
                }
            }
            else if (item.name && item.id) {
                try {
                    const editTool = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.ToolModel.findByPk(item.id);
                    editTool.set('name', item.name);
                    console.log('Herramienta actualizada:', editTool.toJSON());
                    await editTool.save();
                }
                catch (error) {
                    console.error('Error al actualizar la herramienta:', error);
                }
            }
            if (!item.name && item.id) {
                try {
                    const destroyTool = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.ToolModel.findByPk(item.id);
                    console.log('Herramienta destruida:', destroyTool.toJSON());
                    await destroyTool.destroy();
                }
                catch (error) {
                    console.error('Error al destruir la herramienta:', error);
                }
            }
        }));
        // MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS   MATERIALS
        await Promise.all(materials.map(async (item, index) => {
            if (item.name && !item.id) {
                try {
                    const newMaterial = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.MaterialModel.create({
                        name: item.name,
                        fix: false,
                        index: item.index,
                        workplanid: parseInt(workplanid)
                    });
                    newMaterials.push({
                        ...newMaterial.dataValues,
                        index: index
                    });
                    console.log('Material creado:', newMaterial.toJSON());
                }
                catch (error) {
                    console.error('Error al crear el material:', error);
                }
            }
            else if (item.name && item.id) {
                try {
                    const editMaterial = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.MaterialModel.findByPk(item.id);
                    editMaterial.set('name', item.name);
                    console.log('Material actualizada:', editMaterial.toJSON());
                    await editMaterial.save();
                }
                catch (error) {
                    console.error('Error al actualizar la material:', error);
                }
            }
            if (!item.name && item.id) {
                try {
                    const destroyMaterial = await _db_models_WorkPlan__WEBPACK_IMPORTED_MODULE_1__.MaterialModel.findByPk(item.id);
                    console.log('Material destruida:', destroyMaterial.toJSON());
                    await destroyMaterial.destroy();
                }
                catch (error) {
                    console.error('Error al destruir la material:', error);
                }
            }
        }));
        note && (plan.note = note);
        // SAVE   SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE    SAVE
        await plan.save();
        return res.status(200).json({ message: 'Plan de trabajo actualizado correctamente', lists: { tasks: newTasks, tools: newTools, materials: newMaterials } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el plan de trabajo' });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes_workPlan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/workPlan */ "./src/server/routes/workPlan.ts");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_3__);




dotenv__WEBPACK_IMPORTED_MODULE_3___default().config({ path: '.env.local' });
const app = express__WEBPACK_IMPORTED_MODULE_1___default()();
// Configura el servidor para servir los archivos estáticos de la aplicación CRA
app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default().json());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_0___default().urlencoded({ extended: true }));
// Middleware para agregar el encabezado CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use("/api", _routes_workPlan__WEBPACK_IMPORTED_MODULE_2__["default"]);
app.listen(process.env.REACT_APP_SERVER_PORT);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLHdEQUFjLENBQUMsQ0FBQztBQUVoQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUU5QyxpRUFBZSxHQUFHLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wZXJzb25hbC8uL3NyYy9zZXJ2ZXIvZGIvZGF0YWJhc2UudHMiLCJ3ZWJwYWNrOi8vcGVyc29uYWwvLi9zcmMvc2VydmVyL2RiL21vZGVscy9Xb3JrUGxhbi50cyIsIndlYnBhY2s6Ly9wZXJzb25hbC8uL3NyYy9zZXJ2ZXIvcm91dGVzL3dvcmtQbGFuLnRzIiwid2VicGFjazovL3BlcnNvbmFsL2V4dGVybmFsIGNvbW1vbmpzIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9wZXJzb25hbC9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3BlcnNvbmFsL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3BlcnNvbmFsL2V4dGVybmFsIGNvbW1vbmpzIFwicGdcIiIsIndlYnBhY2s6Ly9wZXJzb25hbC9leHRlcm5hbCBjb21tb25qcyBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovL3BlcnNvbmFsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BlcnNvbmFsL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BlcnNvbmFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wZXJzb25hbC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BlcnNvbmFsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGVyc29uYWwvLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3BnJyk7XHJcbmltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gJ3NlcXVlbGl6ZSc7XHJcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcclxuXHJcbmRvdGVudi5jb25maWcoeyBwYXRoOiAnLmVudi5sb2NhbCcgfSk7XHJcblxyXG5jb25zdCBkYXRhYmFzZSA9IHByb2Nlc3MuZW52LlBPU1RHUkVTX0RBVEFCQVNFIHx8ICcnO1xyXG5jb25zdCB1c2VybmFtZSA9IHByb2Nlc3MuZW52LlBPU1RHUkVTX1VTRVIgfHwgJyc7XHJcbmNvbnN0IHBhc3N3b3JkID0gcHJvY2Vzcy5lbnYuUE9TVEdSRVNfUEFTU1dPUkQgfHwgJyc7XHJcbmNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5QT1NUR1JFU19IT1NUO1xyXG5jb25zdCBwb3J0ID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9TVEdSRVNfUE9SVCB8fCAnJyk7XHJcblxyXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcclxuICBob3N0OiBob3N0LFxyXG4gIHBvcnQ6IHBvcnQsXHJcbiAgZGlhbGVjdDogJ3Bvc3RncmVzJyxcclxuICBkaWFsZWN0T3B0aW9uczoge1xyXG4gICAgc3NsOiB7XHJcbiAgICAgIHJlcXVpcmU6IHRydWUsXHJcbiAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UgLy8gUHVlZGVzIGNhbWJpYXIgZXN0byBzZWfDum4gdHVzIG5lY2VzaWRhZGVzIGRlIHNlZ3VyaWRhZFxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5zZXF1ZWxpemVcclxuICAuYXV0aGVudGljYXRlKClcclxuICAudGhlbigoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnQ29uZXhpw7NuIGEgbGEgYmFzZSBkZSBkYXRvcyBlc3RhYmxlY2lkYSBjb3JyZWN0YW1lbnRlJyk7XHJcbiAgfSlcclxuICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbmVjdGFyIGEgbGEgYmFzZSBkZSBkYXRvczonLCBlcnJvcik7XHJcbiAgfSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZXF1ZWxpemU7XHJcbiIsImltcG9ydCB7IE1vZGVsLCBEYXRhVHlwZXMsIEhhc01hbnlHZXRBc3NvY2lhdGlvbnNNaXhpbiAgfSBmcm9tICdzZXF1ZWxpemUnO1xyXG5pbXBvcnQgc2VxdWVsaXplIGZyb20gJy4uL2RhdGFiYXNlJztcclxuaW1wb3J0IHsgV29ya1BsYW5Nb2RlbEludGVyZmFjZSwgVGFza3NUeXBlLCBUb29sc1R5cGUsIE1hdGVyaWFsc1R5cGUgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL1dvcmtQbGFuJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JrUGxhbk1vZGVsIGV4dGVuZHMgTW9kZWw8V29ya1BsYW5Nb2RlbEludGVyZmFjZT4gaW1wbGVtZW50cyBXb3JrUGxhbk1vZGVsSW50ZXJmYWNlIHtcclxuICAgIHB1YmxpYyBpZCE6IG51bWJlcjtcclxuICAgIHB1YmxpYyB3b3JrbmFtZSE6IHN0cmluZztcclxuICAgIHB1YmxpYyB0b3RhbHRpbWUhOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgd29ya2RheXMhOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZmlkZWxpdHlwZXJjZW50YWdlITogbnVtYmVyO1xyXG4gICAgcHVibGljIHN0YXJ0ZGF0ZSE6IHN0cmluZztcclxuICAgIHB1YmxpYyBleHBpcmF0aW9uZGF0ZSE6IHN0cmluZztcclxuICAgIHB1YmxpYyBub3RlITogc3RyaW5nO1xyXG4gICAgcHVibGljIGdldFRhc2tzITogSGFzTWFueUdldEFzc29jaWF0aW9uc01peGluPFRhc2tNb2RlbD47XHJcbiAgICBwdWJsaWMgZ2V0VG9vbHMhOiBIYXNNYW55R2V0QXNzb2NpYXRpb25zTWl4aW48VG9vbE1vZGVsPjtcclxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbHMhOiBIYXNNYW55R2V0QXNzb2NpYXRpb25zTWl4aW48TWF0ZXJpYWxNb2RlbD47XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IHRhc2tzPzogVGFza01vZGVsW107XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdG9vbHM/OiBUb29sTW9kZWxbXTtcclxuICAgIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHM/OiBNYXRlcmlhbE1vZGVsW107XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbE1vZGVsIGV4dGVuZHMgTW9kZWw8TWF0ZXJpYWxzVHlwZT4gaW1wbGVtZW50cyBNYXRlcmlhbHNUeXBlIHtcclxuICAgIHB1YmxpYyBpZCE6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBuYW1lITogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGZpeCE6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaW5kZXghOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgd29ya3BsYW5pZCE6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRvb2xNb2RlbCBleHRlbmRzIE1vZGVsPFRvb2xzVHlwZT4gaW1wbGVtZW50cyBUb29sc1R5cGUge1xyXG4gICAgcHVibGljIGlkITogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIG5hbWUhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgYnJlYWtwb2ludCE6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgZml4ITogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpbmRleCE6IG51bWJlcjtcclxuICAgIHB1YmxpYyB3b3JrcGxhbmlkITogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFza01vZGVsIGV4dGVuZHMgTW9kZWw8VGFza3NUeXBlPiBpbXBsZW1lbnRzIFRhc2tzVHlwZSB7XHJcbiAgICBwdWJsaWMgaWQhOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgdGl0bGUhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgYnJlYWtwb2ludCE6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaW5kZXghOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgd29ya3BsYW5pZCE6IG51bWJlcjtcclxufVxyXG5cclxuV29ya1BsYW5Nb2RlbC5pbml0KFxyXG4gICAge1xyXG4gICAgICAgIGlkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3b3JrbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG90YWx0aW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd29ya2RheXM6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWRlbGl0eXBlcmNlbnRhZ2U6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydGRhdGU6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLkRBVEVPTkxZLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXhwaXJhdGlvbmRhdGU6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLkRBVEVPTkxZLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm90ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IHRydWUsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWJsZU5hbWU6IFwid29ya3BsYW5cIixcclxuICAgICAgICB0aW1lc3RhbXBzOiBmYWxzZSxcclxuICAgICAgICBzZXF1ZWxpemVcclxuICAgIH1cclxuKTsgXHJcblxyXG5UYXNrTW9kZWwuaW5pdChcclxuICAgIHtcclxuICAgICAgICBpZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgICAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJyZWFrcG9pbnQ6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLkJPT0xFQU4sXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IHRydWUsICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd29ya3BsYW5pZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVmZXJlbmNlczoge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiAnd29ya3BsYW4nLFxyXG4gICAgICAgICAgICAgIGtleTogJ2lkJ1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGFibGVOYW1lOiBcInRhc2tcIixcclxuICAgICAgICB0aW1lc3RhbXBzOiBmYWxzZSxcclxuICAgICAgICBzZXF1ZWxpemVcclxuICAgIH1cclxuKTsgXHJcblxyXG5Ub29sTW9kZWwuaW5pdChcclxuICAgIHtcclxuICAgICAgICBpZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgICAgICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWtwb2ludDoge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuQk9PTEVBTixcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZml4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5CT09MRUFOLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmRleDoge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiB0cnVlLCAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdvcmtwbGFuaWQ6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlZmVyZW5jZXM6IHtcclxuICAgICAgICAgICAgICBtb2RlbDogJ3dvcmtwbGFuJyxcclxuICAgICAgICAgICAgICBrZXk6ICdpZCdcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRhYmxlTmFtZTogXCJ0b29sXCIsXHJcbiAgICAgICAgdGltZXN0YW1wczogZmFsc2UsXHJcbiAgICAgICAgc2VxdWVsaXplXHJcbiAgICB9XHJcbik7IFxyXG5cclxuTWF0ZXJpYWxNb2RlbC5pbml0KFxyXG4gICAge1xyXG4gICAgICAgIGlkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICAgICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50OiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaXg6IHtcclxuICAgICAgICAgICAgdHlwZTogRGF0YVR5cGVzLkJPT0xFQU4sXHJcbiAgICAgICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICAgICAgICBhbGxvd051bGw6IHRydWUsICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd29ya3BsYW5pZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgICAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVmZXJlbmNlczoge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiAnd29ya3BsYW4nLFxyXG4gICAgICAgICAgICAgIGtleTogJ2lkJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0YWJsZU5hbWU6IFwibWF0ZXJpYWxcIixcclxuICAgICAgICB0aW1lc3RhbXBzOiBmYWxzZSxcclxuICAgICAgICBzZXF1ZWxpemVcclxuICAgIH1cclxuKTsgXHJcblxyXG5Xb3JrUGxhbk1vZGVsLmhhc01hbnkoVGFza01vZGVsLCB7XHJcbiAgICBzb3VyY2VLZXk6ICdpZCcsXHJcbiAgICBmb3JlaWduS2V5OiAnd29ya3BsYW5pZCcsXHJcbiAgICBhczogJ3Rhc2tzJ1xyXG59KTtcclxuV29ya1BsYW5Nb2RlbC5oYXNNYW55KFRvb2xNb2RlbCwge1xyXG4gICAgc291cmNlS2V5OiAnaWQnLFxyXG4gICAgZm9yZWlnbktleTogJ3dvcmtwbGFuaWQnLFxyXG4gICAgYXM6ICd0b29scydcclxufSk7XHJcbldvcmtQbGFuTW9kZWwuaGFzTWFueShNYXRlcmlhbE1vZGVsLCB7XHJcbiAgICBzb3VyY2VLZXk6ICdpZCcsXHJcbiAgICBmb3JlaWduS2V5OiAnd29ya3BsYW5pZCcsXHJcbiAgICBhczogJ21hdGVyaWFscydcclxufSk7XHJcblxyXG5UYXNrTW9kZWwuYmVsb25nc1RvKFdvcmtQbGFuTW9kZWwsIHsgZm9yZWlnbktleTogJ3dvcmtwbGFuaWQnIH0pO1xyXG5Ub29sTW9kZWwuYmVsb25nc1RvKFdvcmtQbGFuTW9kZWwsIHsgZm9yZWlnbktleTogJ3dvcmtwbGFuaWQnIH0pO1xyXG5NYXRlcmlhbE1vZGVsLmJlbG9uZ3NUbyhXb3JrUGxhbk1vZGVsLCB7IGZvcmVpZ25LZXk6ICd3b3JrcGxhbmlkJyB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmtQbGFuTW9kZWw7IiwiaW1wb3J0IHsgV29ya1BsYW5JbnRlcmZhY2UsIFdvcmtQbGFuTW9kZWxJbnRlcmZhY2UsIFRhc2tzVHlwZSwgVG9vbHNUeXBlLCBNYXRlcmlhbHNUeXBlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9Xb3JrUGxhbic7XHJcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgV29ya1BsYW5Nb2RlbCwgVGFza01vZGVsLCBUb29sTW9kZWwsIE1hdGVyaWFsTW9kZWwgfSBmcm9tICcuLi9kYi9tb2RlbHMvV29ya1BsYW4nO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbi8vIE9idGVuZXIgdG9kb3MgbG9zIHVzdWFyaW9zXHJcbnJvdXRlci5nZXQoJy9wbGFuZXMtZGUtdHJhYmFqbycsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcGxhbiA9IGF3YWl0IFdvcmtQbGFuTW9kZWwuZmluZEFsbCh7XHJcbiAgICAgIGluY2x1ZGU6IFt7bW9kZWw6IFRhc2tNb2RlbCwgYXM6ICd0YXNrcyd9LCB7bW9kZWw6IFRvb2xNb2RlbCwgYXM6ICd0b29scyd9LCB7bW9kZWw6IE1hdGVyaWFsTW9kZWwsIGFzOiAnbWF0ZXJpYWxzJ31dXHJcbiAgICB9KTtcclxuICAgIHJlcy5qc29uKHBsYW4pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRXJyb3IgYWwgb2J0ZW5lciBsb3MgcGxhbmVzJyB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoJy9wbGFuZXMtZGUtdHJhYmFqbycsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBpZCwgd29ya25hbWUsIHdvcmtkYXlzLCB0b3RhbHRpbWUsIGZpZGVsaXR5cGVyY2VudGFnZSwgc3RhcnRkYXRlLCBleHBpcmF0aW9uZGF0ZSwgbm90ZSwgdGFza3MsIHRvb2xzLCBtYXRlcmlhbHNcclxuICB9OiBXb3JrUGxhbkludGVyZmFjZSA9IHJlcS5ib2R5OyBcclxuICBjb25zdCB3b3JrUGxhbjogV29ya1BsYW5Nb2RlbEludGVyZmFjZSA9IHsgaWQ6IHVuZGVmaW5lZCwgd29ya25hbWUsIHdvcmtkYXlzLCB0b3RhbHRpbWUsIGZpZGVsaXR5cGVyY2VudGFnZSwgbm90ZSwgc3RhcnRkYXRlLCBleHBpcmF0aW9uZGF0ZSB9O1xyXG4gIGNvbnN0IG5ld1Rhc2tzOiBBcnJheTxUYXNrc1R5cGU+ID0gW107XHJcbiAgY29uc3QgbmV3VG9vbHM6IEFycmF5PFRvb2xzVHlwZT4gPSBbXTtcclxuICBjb25zdCBuZXdNYXRlcmlhbHM6IEFycmF5PE1hdGVyaWFsc1R5cGU+ID0gW107IFxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgbmV3V29ya1BsYW4gPSBhd2FpdCBXb3JrUGxhbk1vZGVsLmNyZWF0ZSh3b3JrUGxhbikudGhlbihyZXMgPT4ge1xyXG4gICAgICBsZXQgd29ya1BsYW5JZDogbnVtYmVyID0gcmVzLmlkO1xyXG4gICAgICAvLyBUQVNLUyAgIFRBU0tTICAgVEFTS1MgICBUQVNLUyAgIFRBU0tTICAgVEFTS1MgICBUQVNLUyAgIFRBU0tTICAgVEFTS1MgICBUQVNLU1xyXG4gICAgICAodGFza3MubWFwKGFzeW5jIChpdGVtKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBhd2FpdCBUYXNrTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB3b3JrcGxhbmlkOiB3b3JrUGxhbklkLFxyXG4gICAgICAgICAgICBpbmRleDogaXRlbS5pbmRleFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBuZXdUYXNrcy5wdXNoKHtcclxuICAgICAgICAgICAgLi4ubmV3VGFzay5kYXRhVmFsdWVzLFxyXG4gICAgICAgICAgICBpbmRleDogaXRlbS5pbmRleFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnVGFyZWEgY3JlYWRhOicsIG5ld1Rhc2sudG9KU09OKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNyZWFyIGxhIHRhcmVhOicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIC8vIFRvb2xzICAgVG9vbHMgICBUb29scyAgIFRvb2xzICAgVG9vbHMgICBUb29scyAgIFRvb2xzICAgVG9vbHMgICBUb29scyAgIFRvb2xzXHJcbiAgICAgICh0b29scy5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgbmV3VG9vbCA9IGF3YWl0IFRvb2xNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaXg6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmRleDogaXRlbS5pbmRleCxcclxuICAgICAgICAgICAgd29ya3BsYW5pZDogd29ya1BsYW5JZFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBuZXdUb29scy5wdXNoKHtcclxuICAgICAgICAgICAgLi4ubmV3VG9vbC5kYXRhVmFsdWVzLFxyXG4gICAgICAgICAgICBpbmRleDogaXRlbS5pbmRleFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnSGVycmFtaWVudGEgY3JlYWRhOicsIG5ld1Rvb2wudG9KU09OKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNyZWFyIGxhIGhlcnJhbWllbnRhOicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIC8vIE1BVEVSSUFMUyAgIE1BVEVSSUFMUyAgIE1BVEVSSUFMUyAgIE1BVEVSSUFMUyAgIE1BVEVSSUFMUyAgIE1BVEVSSUFMUyAgIE1BVEVSSUFMU1xyXG4gICAgICAobWF0ZXJpYWxzLm1hcChhc3luYyAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgbmV3TWF0ZXJpYWwgPSBhd2FpdCBNYXRlcmlhbE1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgZml4OiBmYWxzZSxcclxuICAgICAgICAgICAgaW5kZXg6IGl0ZW0uaW5kZXgsXHJcbiAgICAgICAgICAgIHdvcmtwbGFuaWQ6IHdvcmtQbGFuSWRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbmV3TWF0ZXJpYWxzLnB1c2goe1xyXG4gICAgICAgICAgICAuLi5uZXdNYXRlcmlhbC5kYXRhVmFsdWVzLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ01hdGVyaWFsIGNyZWFkbzonLCBuZXdNYXRlcmlhbC50b0pTT04oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgY3JlYXIgZWwgbWF0ZXJpYWw6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogJ1BsYW4gZGUgdHJhYmFqbyBhY3R1YWxpemFkbyBjb3JyZWN0YW1lbnRlJywgbGlzdHM6IHt0YXNrczogbmV3VGFza3MsIHRvb2xzOiBuZXdUb29scywgbWF0ZXJpYWxzOiBuZXdNYXRlcmlhbHN9fSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogJ0Vycm9yIGFsIGFjdHVhbGl6YXIgZWwgcGxhbiBkZSB0cmFiYWpvJyB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxucm91dGVyLnB1dCgnL3BsYW5lcy1kZS10cmFiYWpvLzppZCcsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBpZCwgd29ya25hbWUsIHdvcmtkYXlzLCB0b3RhbHRpbWUsIGZpZGVsaXR5cGVyY2VudGFnZSwgbm90ZSwgdGFza3MsIHRvb2xzLCBtYXRlcmlhbHNcclxuICB9OiBXb3JrUGxhbkludGVyZmFjZSA9IHJlcS5ib2R5OyBcclxuICBjb25zdCB3b3JrcGxhbmlkOiBzdHJpbmcgPSByZXEucGFyYW1zLmlkO1xyXG4gIGNvbnN0IG5ld1Rhc2tzOiBBcnJheTxUYXNrc1R5cGU+ID0gW107XHJcbiAgY29uc3QgbmV3VG9vbHM6IEFycmF5PFRvb2xzVHlwZT4gPSBbXTtcclxuICBjb25zdCBuZXdNYXRlcmlhbHM6IEFycmF5PE1hdGVyaWFsc1R5cGU+ID0gW107IFxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcGxhbiA9IGF3YWl0IFdvcmtQbGFuTW9kZWwuZmluZEJ5UGsod29ya3BsYW5pZCwge1xyXG4gICAgICBpbmNsdWRlOiBbe21vZGVsOiBUYXNrTW9kZWwsIGFzOiAndGFza3MnfSwge21vZGVsOiBUb29sTW9kZWwsIGFzOiAndG9vbHMnfSwge21vZGVsOiBNYXRlcmlhbE1vZGVsLCBhczogJ21hdGVyaWFscyd9XVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGlmICghcGxhbikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiAnUGxhbiBkZSB0cmFiYWpvIG5vIGVuY29udHJhZG8nIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB3b3JrbmFtZSAmJiAocGxhbi5zZXQoXCJ3b3JrbmFtZVwiLCB3b3JrbmFtZSkpO1xyXG4gICAgcGxhbi5zZXQoXCJ0b3RhbHRpbWVcIiwgdG90YWx0aW1lKTtcclxuICAgIHBsYW4uc2V0KFwid29ya2RheXNcIiwgd29ya2RheXMpO1xyXG4gICAgcGxhbi5zZXQoXCJmaWRlbGl0eXBlcmNlbnRhZ2VcIiwgZmlkZWxpdHlwZXJjZW50YWdlKTtcclxuICAgIHBsYW4uc2V0KFwibm90ZVwiLCBub3RlKTtcclxuICAgIC8vIFRBU0tTICAgVEFTS1MgICBUQVNLUyAgIFRBU0tTICAgVEFTS1MgICBUQVNLUyAgIFRBU0tTICAgVEFTS1MgICBUQVNLUyAgIFRBU0tTXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbCAodGFza3MubWFwKGFzeW5jIChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLnRpdGxlICYmICFpdGVtLmlkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBhd2FpdCBUYXNrTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB3b3JrcGxhbmlkOiBwYXJzZUludCh3b3JrcGxhbmlkKSxcclxuICAgICAgICAgICAgaW5kZXg6IGl0ZW0uaW5kZXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbmV3VGFza3MucHVzaCh7XHJcbiAgICAgICAgICAgIC4uLm5ld1Rhc2suZGF0YVZhbHVlcyxcclxuICAgICAgICAgICAgaW5kZXg6IGl0ZW0uaW5kZXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1RhcmVhIGNyZWFkYTonLCBuZXdUYXNrLnRvSlNPTigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjcmVhciBsYSB0YXJlYTonLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoaXRlbS50aXRsZSAmJiBpdGVtLmlkKSAge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBlZGl0VGFzayA9IGF3YWl0IFRhc2tNb2RlbC5maW5kQnlQayhpdGVtLmlkKTtcclxuICAgICAgICAgIGlmIChlZGl0VGFzaykgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlZGl0VGFzay5zZXQoJ3RpdGxlJywgaXRlbS50aXRsZSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGVkaXRUYXNrLnNhdmUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RhcmVhIGFjdHVhbGl6YWRhOicsIGVkaXRUYXNrLnRvSlNPTigpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBzZSBlbmNvbnRyw7MgbGEgdGFyZWEnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBhY3R1YWxpemFyIGxhIHRhcmVhOicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFpdGVtLnRpdGxlICYmIGl0ZW0uaWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgZGVzdHJveVRhc2sgPSBhd2FpdCBUYXNrTW9kZWwuZmluZEJ5UGsoaXRlbS5pZCkgYXMgVGFza01vZGVsO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1RhcmVhIGRlc3RydWlkYTonLCBkZXN0cm95VGFzay50b0pTT04oKSk7XHJcbiAgICAgICAgICBhd2FpdCBkZXN0cm95VGFzay5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZGVzdHJ1aXIgbGEgdGFyZWE6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIFRvb2xzICAgVG9vbHMgICBUb29scyAgIFRvb2xzICAgVG9vbHMgICBUb29scyAgIFRvb2xzICAgVG9vbHMgICBUb29scyAgIFRvb2xzXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbCAodG9vbHMubWFwKGFzeW5jIChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLm5hbWUgJiYgIWl0ZW0uaWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgbmV3VG9vbCA9IGF3YWl0IFRvb2xNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaXg6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbmRleDogaXRlbS5pbmRleCxcclxuICAgICAgICAgICAgd29ya3BsYW5pZDogcGFyc2VJbnQod29ya3BsYW5pZClcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbmV3VG9vbHMucHVzaCh7XHJcbiAgICAgICAgICAgIC4uLm5ld1Rvb2wuZGF0YVZhbHVlcyxcclxuICAgICAgICAgICAgaW5kZXg6IGl0ZW0uaW5kZXhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0hlcnJhbWllbnRhIGNyZWFkYTonLCBuZXdUb29sLnRvSlNPTigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjcmVhciBsYSBoZXJyYW1pZW50YTonLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoaXRlbS5uYW1lICYmIGl0ZW0uaWQpICB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGVkaXRUb29sID0gYXdhaXQgVG9vbE1vZGVsLmZpbmRCeVBrKGl0ZW0uaWQpIGFzIFRvb2xNb2RlbDtcclxuICAgICAgICAgIGVkaXRUb29sLnNldCgnbmFtZScsIGl0ZW0ubmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnSGVycmFtaWVudGEgYWN0dWFsaXphZGE6JywgZWRpdFRvb2wudG9KU09OKCkpO1xyXG4gICAgICAgICAgYXdhaXQgZWRpdFRvb2wuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGFjdHVhbGl6YXIgbGEgaGVycmFtaWVudGE6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWl0ZW0ubmFtZSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlc3Ryb3lUb29sID0gYXdhaXQgVG9vbE1vZGVsLmZpbmRCeVBrKGl0ZW0uaWQpIGFzIFRvb2xNb2RlbDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdIZXJyYW1pZW50YSBkZXN0cnVpZGE6JywgZGVzdHJveVRvb2wudG9KU09OKCkpO1xyXG4gICAgICAgICAgYXdhaXQgZGVzdHJveVRvb2wuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGRlc3RydWlyIGxhIGhlcnJhbWllbnRhOicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBNQVRFUklBTFMgICBNQVRFUklBTFMgICBNQVRFUklBTFMgICBNQVRFUklBTFMgICBNQVRFUklBTFMgICBNQVRFUklBTFMgICBNQVRFUklBTFNcclxuICAgIGF3YWl0IFByb21pc2UuYWxsIChtYXRlcmlhbHMubWFwKGFzeW5jIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lICYmICFpdGVtLmlkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IG5ld01hdGVyaWFsID0gYXdhaXQgTWF0ZXJpYWxNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgIGZpeDogZmFsc2UsXHJcbiAgICAgICAgICAgIGluZGV4OiBpdGVtLmluZGV4LFxyXG4gICAgICAgICAgICB3b3JrcGxhbmlkOiBwYXJzZUludCh3b3JrcGxhbmlkKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBuZXdNYXRlcmlhbHMucHVzaCh7XHJcbiAgICAgICAgICAgIC4uLm5ld01hdGVyaWFsLmRhdGFWYWx1ZXMsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnTWF0ZXJpYWwgY3JlYWRvOicsIG5ld01hdGVyaWFsLnRvSlNPTigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjcmVhciBlbCBtYXRlcmlhbDonLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoaXRlbS5uYW1lICYmIGl0ZW0uaWQpICB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGVkaXRNYXRlcmlhbCA9IGF3YWl0IE1hdGVyaWFsTW9kZWwuZmluZEJ5UGsoaXRlbS5pZCkgYXMgTWF0ZXJpYWxNb2RlbDtcclxuICAgICAgICAgIGVkaXRNYXRlcmlhbC5zZXQoJ25hbWUnLCBpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ01hdGVyaWFsIGFjdHVhbGl6YWRhOicsIGVkaXRNYXRlcmlhbC50b0pTT04oKSk7XHJcbiAgICAgICAgICBhd2FpdCBlZGl0TWF0ZXJpYWwuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGFjdHVhbGl6YXIgbGEgbWF0ZXJpYWw6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoIWl0ZW0ubmFtZSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRlc3Ryb3lNYXRlcmlhbCA9IGF3YWl0IE1hdGVyaWFsTW9kZWwuZmluZEJ5UGsoaXRlbS5pZCkgYXMgTWF0ZXJpYWxNb2RlbDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdNYXRlcmlhbCBkZXN0cnVpZGE6JywgZGVzdHJveU1hdGVyaWFsLnRvSlNPTigpKTtcclxuICAgICAgICAgIGF3YWl0IGRlc3Ryb3lNYXRlcmlhbC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZGVzdHJ1aXIgbGEgbWF0ZXJpYWw6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgXHJcbiAgICBub3RlICYmIChwbGFuLm5vdGUgPSBub3RlKTtcclxuXHJcbiAgICAvLyBTQVZFICAgU0FWRSAgICBTQVZFICAgIFNBVkUgICAgU0FWRSAgICBTQVZFICAgIFNBVkUgICAgU0FWRSAgICBTQVZFICAgIFNBVkUgICAgU0FWRSAgICBTQVZFICAgIFNBVkUgICAgU0FWRSAgICBTQVZFICAgIFNBVkUgICAgU0FWRVxyXG4gICAgYXdhaXQgcGxhbi5zYXZlKCk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiAnUGxhbiBkZSB0cmFiYWpvIGFjdHVhbGl6YWRvIGNvcnJlY3RhbWVudGUnLCBsaXN0czoge3Rhc2tzOiBuZXdUYXNrcywgdG9vbHM6IG5ld1Rvb2xzLCBtYXRlcmlhbHM6IG5ld01hdGVyaWFsc319KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAnRXJyb3IgYWwgYWN0dWFsaXphciBlbCBwbGFuIGRlIHRyYWJham8nIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XHJcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgd29ya1BsYW5Sb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvd29ya1BsYW4nO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcblxyXG5kb3RlbnYuY29uZmlnKHsgcGF0aDogJy5lbnYubG9jYWwnIH0pO1xyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuLy8gQ29uZmlndXJhIGVsIHNlcnZpZG9yIHBhcmEgc2VydmlyIGxvcyBhcmNoaXZvcyBlc3TDoXRpY29zIGRlIGxhIGFwbGljYWNpw7NuIENSQVxyXG5cclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xyXG5cclxuLy8gTWlkZGxld2FyZSBwYXJhIGFncmVnYXIgZWwgZW5jYWJlemFkbyBDT1JTXHJcbmFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcclxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCwgUFVULCBQT1NULCBERUxFVEUnKTtcclxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJywgJ0NvbnRlbnQtVHlwZScpO1xyXG4gIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJywgJ3RydWUnKTtcclxuICBuZXh0KCk7XHJcbn0pO1xyXG5cclxuYXBwLnVzZShcIi9hcGlcIiwgd29ya1BsYW5Sb3V0ZXMpO1xyXG5cclxuYXBwLmxpc3Rlbihwcm9jZXNzLmVudi5SRUFDVF9BUFBfU0VSVkVSX1BPUlQpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBwOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==