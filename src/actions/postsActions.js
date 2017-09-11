export const ORDER_POSTS = 'ORDER_POSTS';

export function orderPosts(criteria) {
    return {
        type: ORDER_POSTS,
        criteria
    }
}
