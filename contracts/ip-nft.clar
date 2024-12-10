;; IP-NFT Contract

(define-non-fungible-token ip-nft uint)

(define-data-var last-token-id uint u0)

(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

(define-map token-metadata
  { token-id: uint }
  {
    owner: principal,
    ip-type: (string-ascii 20),
    content-hash: (buff 32),
    expiration: uint
  }
)

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-public (mint (ip-type (string-ascii 20)) (content-hash (buff 32)) (expiration uint))
  (let
    (
      (token-id (+ (var-get last-token-id) u1))
    )
    (try! (nft-mint? ip-nft token-id tx-sender))
    (map-set token-metadata
      { token-id: token-id }
      {
        owner: tx-sender,
        ip-type: ip-type,
        content-hash: content-hash,
        expiration: expiration
      }
    )
    (var-set last-token-id token-id)
    (ok token-id)
  )
)

(define-public (transfer (token-id uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (nft-get-owner? ip-nft token-id) err-not-token-owner)) err-not-token-owner)
    (try! (nft-transfer? ip-nft token-id tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-token-metadata (token-id uint))
  (ok (unwrap! (map-get? token-metadata { token-id: token-id }) (err u404)))
)

(define-public (update-expiration (token-id uint) (new-expiration uint))
  (let
    (
      (token-data (unwrap! (map-get? token-metadata { token-id: token-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get owner token-data)) err-not-token-owner)
    (ok (map-set token-metadata
      { token-id: token-id }
      (merge token-data { expiration: new-expiration })
    ))
  )
)

