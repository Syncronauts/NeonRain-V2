import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserCreatedTokens(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserCreatedTokens($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    createdTokens(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            cursor
                            node {
                                contract
                                tokenId
                                name
                                description
                                image
                                imageThumb
                                likes
                                hasBids
                                collection {
                                    contract
                                    name
                                }
                                listingPrice {
                                    amount
                                    payToken
                                }
                                auctionedPrice {
                                    amount
                                    payToken
                                }
                                auctionReservePrice {
                                    amount
                                    payToken
                                }
                                offeredPrice {
                                    amount
                                    payToken
                                }
                                lastTradePrice {
                                    amount
                                    payToken
                                }
                                auction {
                                    endTime
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            address,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.createdTokens');
}
