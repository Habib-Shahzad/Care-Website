import activityObj from './activity';
import blogObj from './blog';
import departmentObj from './department';
import imageObj from './image';
import userObj from './user';

export { default as userObj } from './user';
export { default as activityObj } from './activity';
export { default as blogObj } from './blog';
export { default as imageObj } from './image';
export { default as departmentObj } from './department';


export const modelToTable = {
    "user": userObj,
    "activity": activityObj,
    "blog": blogObj,
    "image": imageObj,
    "department": departmentObj,
}