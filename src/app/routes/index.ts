import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CourseRoutes } from '../modules/course/course.route';

export const router = Router();

interface IModule {
    path: string;
    route: any;
}

const modelerRouters: IModule[] = [
    {
        path: "/user",
        route: UserRouter
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/courses",
        route: CourseRoutes
    }
];


modelerRouters.forEach((route) => {
    router.use(route.path, route.route)
})