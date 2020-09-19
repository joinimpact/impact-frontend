import config from 'config';
import { IQueryParams, IRoutable, TRouteTree } from 'shared/types/app';

interface IRouteDefinitionTree {
	[key: string]: IRouteDefinitionTree;
}

export function routeBuilder<T extends IRouteDefinitionTree>(routes: T, depth: string[] = []): TRouteTree<T> {
	const res: TRouteTree<T> = {} as TRouteTree<T>;
	const keys: (keyof T)[] = Object.keys(routes);
	for (const route of keys) {
		const level = depth.concat(route as string);
		const formattedPath = `${config.prefixRoot}${level.join('/')}`;
		const routeItem: IRoutable = {
			getPath: makeGetPath(formattedPath),
			getElementKey: () => route as string,
		};

		if (route === null) {
			(res as any)[route] = routeItem;
		} else {
			res[route] = {
				...routeBuilder(routes[route], level),
				...routeItem,
			};
		}
	}
	return res;
}

const makeGetPath = (path: string) => (queryParams?: IQueryParams): string => {
	const params = queryParams
		? `?${Object.entries(queryParams)
			.map((x) => x.join('='))
			.join('&')}`
		: '';
	return `${path}${params}`;
};
