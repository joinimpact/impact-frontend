export interface IGoogleToken {
	access_token: string;
	expires_at: number;
	expires_in: number;
	first_issued_at: number;
	id_token: string;
	idpId: string;
	login_hint: string;
	scope: string;
	session_state: {
		extraQueryParams: {
			authuser: string;
		};
	};
	token_type: string;
}

export interface IGoogleResponse {
	Ea: string;
	Qt: {
		Au: string;
		Bd: string;
		VU: string;
		cL: string;
		zU: string;
	};
	accessToken: string;
	googleId: string;
	profileObj: {
		email: string;
		familyName: string;
		givenName: string;
		googleId: string;
		imageUrl: string;
		name: string;
	};
	tokenId: string;
	tokenObj: IGoogleToken;
	wc: IGoogleToken;
}
